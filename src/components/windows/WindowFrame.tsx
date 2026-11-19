import { Maximize2, Minimize2, Minus, Pin, X } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { AppIcon } from '@/components/app-icons/AppIcon';
import { IconButton } from '@/components/ui/IconButton';
import { WindowContent } from '@/components/windows/WindowContent';
import { getApp } from '@/data/apps';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import { useWindows } from '@/state/windows';
import type { DesktopWindow } from '@/types';

interface DragSession {
  startX: number;
  startY: number;
  originX: number;
  originY: number;
}

function TrafficLight({
  color,
  label,
  onClick,
  children,
}: {
  color: 'close' | 'minimize' | 'maximize';
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  const colorClasses = {
    close: 'border-[#e24741] bg-[#ff5f57]',
    minimize: 'border-[#dda123] bg-[#febc2e]',
    maximize: 'border-[#13a52c] bg-[#28c840]',
  }[color];

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={onClick}
      className="group/light flex size-5 items-center justify-center rounded-full"
    >
      <span
        className={cn(
          'flex size-[11px] items-center justify-center rounded-full border shadow-[0_0.5px_1px_rgb(0_0_0/0.15)] transition-transform duration-150 group-hover/light:scale-110',
          colorClasses,
        )}
      >
        <span className="text-black/55 opacity-0 transition-opacity group-hover/light:opacity-100 [&_svg]:size-[7px]">
          {children}
        </span>
      </span>
    </button>
  );
}

export function WindowFrame({ window: win }: { window: DesktopWindow }) {
  const {
    activeWindowId,
    closeWindow,
    minimizeWindow,
    focusWindow,
    togglePin,
    toggleMaximize,
    moveWindow,
  } = useWindows();
  const { t, tr } = useI18n();
  const app = getApp(win.appId);
  const appName = tr(app.name);
  const isActive = activeWindowId === win.id;
  const [dragging, setDragging] = useState(false);
  const [closing, setClosing] = useState(false);
  const dragRef = useRef<DragSession | null>(null);
  const cleanUpDrag = useRef<(() => void) | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      cleanUpDrag.current?.();
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const requestClose = useCallback(() => {
    setClosing(true);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => closeWindow(win.id), 150);
  }, [closeWindow, win.id]);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      focusWindow(win.id);
      if (event.button !== 0 || win.maximized) return;
      const target = event.target as HTMLElement;
      if (target.closest('button, input, textarea, a, [data-no-drag]')) return;

      event.preventDefault();
      dragRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        originX: win.x,
        originY: win.y,
      };
      setDragging(true);
      document.body.classList.add('window-dragging');

      const handleMove = (moveEvent: PointerEvent) => {
        const drag = dragRef.current;
        if (!drag) return;
        const maxX = window.innerWidth - win.width - 8;
        const x = Math.min(
          Math.max(drag.originX + moveEvent.clientX - drag.startX, 8),
          Math.max(8, maxX),
        );
        const y = Math.min(
          Math.max(drag.originY + moveEvent.clientY - drag.startY, 46),
          Math.max(46, window.innerHeight - 72),
        );
        moveWindow(win.id, x, y);
      };

      const endDrag = () => {
        dragRef.current = null;
        setDragging(false);
        document.body.classList.remove('window-dragging');
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', endDrag);
        window.removeEventListener('pointercancel', endDrag);
        cleanUpDrag.current = null;
      };

      cleanUpDrag.current = endDrag;
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);
    },
    [focusWindow, moveWindow, win.id, win.maximized, win.width, win.x, win.y],
  );

  const geometry = win.maximized
    ? {
        left: 12,
        top: 52,
        width: 'calc(100vw - 24px)',
        height: 'calc(100vh - 148px)',
      }
    : {
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
      };

  return (
    <div
      role="dialog"
      aria-label={t('shell.window.aria', { app: appName })}
      aria-hidden={win.minimized || closing}
      inert={win.minimized || closing}
      data-testid={`window-${win.appId}`}
      data-active={isActive}
      data-minimized={win.minimized}
      data-dragging={dragging}
      data-closing={closing}
      className="window-shell pointer-events-auto absolute flex flex-col overflow-hidden rounded-[18px]"
      style={{
        ...geometry,
        zIndex: win.pinned ? 1000 + win.zIndex : win.zIndex,
      }}
      onPointerDown={() => focusWindow(win.id)}
    >
      <div
        data-testid={`window-titlebar-${win.appId}`}
        className={cn(
          'relative flex h-11 shrink-0 cursor-grab select-none items-center border-b px-3 transition-colors duration-200 active:cursor-grabbing',
          isActive
            ? 'border-line/[0.08] bg-surface-alt/90'
            : 'border-line/[0.055] bg-surface-alt/55',
        )}
        onPointerDown={handlePointerDown}
        onDoubleClick={(event) => {
          if ((event.target as HTMLElement).closest('button')) return;
          toggleMaximize(win.id);
        }}
        style={{ touchAction: 'none' }}
      >
        <div className={cn('flex items-center gap-1.5', !isActive && 'opacity-80')}>
          <TrafficLight
            color="close"
            label={t('shell.window.close', { app: appName })}
            onClick={requestClose}
          >
            <X />
          </TrafficLight>
          <TrafficLight
            color="minimize"
            label={t('shell.window.minimize', { app: appName })}
            onClick={() => minimizeWindow(win.id)}
          >
            <Minus />
          </TrafficLight>
          <TrafficLight
            color="maximize"
            label={
              win.maximized
                ? t('shell.window.restore', { app: appName })
                : t('shell.window.maximize', { app: appName })
            }
            onClick={() => toggleMaximize(win.id)}
          >
            {win.maximized ? <Minimize2 /> : <Maximize2 />}
          </TrafficLight>
        </div>

        <div className="pointer-events-none absolute left-1/2 flex max-w-[55%] -translate-x-1/2 items-center gap-2">
          <AppIcon app={app} size="xs" className="shadow-none" />
          <span
            data-testid={`window-title-${win.appId}`}
            className={cn(
              'truncate text-[11.5px] font-semibold tracking-[-0.01em]',
              isActive ? 'text-ink-2' : 'text-muted',
            )}
          >
            {appName}
          </span>
          {win.pinned && (
            <span className="flex items-center gap-1 rounded-full border border-accent/15 bg-accent/[0.08] px-1.5 py-[1px] text-[8.5px] font-medium text-accent-strong">
              <Pin className="size-2 fill-current" />
              {t('shell.window.onTop')}
            </span>
          )}
        </div>

        <div className="ml-auto flex items-center gap-0.5">
          <IconButton
            label={win.pinned ? t('shell.window.unpin') : t('shell.window.pin')}
            size="sm"
            aria-pressed={win.pinned}
            onClick={() => togglePin(win.id)}
            className={cn(
              win.pinned && 'bg-accent/[0.1] text-accent-strong hover:bg-accent/[0.14]',
            )}
          >
            <Pin className={cn('size-3', win.pinned && 'fill-current')} />
          </IconButton>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <WindowContent appId={win.appId} />
      </div>
    </div>
  );
}
