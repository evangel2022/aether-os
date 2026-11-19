import { motion } from 'framer-motion';
import { ChevronRight, Command, Moon, Settings2, Sun, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Kbd } from '@/components/ui/Kbd';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import { commandShortcut } from '@/lib/platform';
import { useDesktop } from '@/state/desktop';
import { useSettings } from '@/state/settings';
import { useWindows } from '@/state/windows';

function MenuRow({
  icon: Icon,
  label,
  trailing,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  trailing?: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-[12px] font-medium text-ink-2 transition-colors duration-150 hover:bg-line/[0.045] hover:text-ink"
    >
      <Icon className="size-[15px] text-muted" strokeWidth={1.8} />
      <span className="flex-1">{label}</span>
      {trailing}
    </button>
  );
}

export function UserMenu() {
  const { closeOverlay, navigate, toggleOverlay } = useDesktop();
  const { settings, resolvedTheme, updateSetting } = useSettings();
  const { closeAllWindows, windows } = useWindows();
  const { t } = useI18n();

  const appearanceLabel =
    settings.appearance === 'light'
      ? t('shell.appearance.light')
      : settings.appearance === 'dark'
        ? t('shell.appearance.dark')
        : t('shell.appearance.system');

  const toggleTheme = () => {
    updateSetting('appearance', resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <button
        type="button"
        aria-label={t('shell.userMenu.closeAria')}
        onClick={closeOverlay}
        className="fixed inset-0 z-[140] cursor-default bg-transparent"
      />
      <motion.section
        aria-label={t('shell.userMenu.aria')}
        initial={{ opacity: 0, y: -6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -4, scale: 0.985 }}
        transition={{ type: 'spring', stiffness: 380, damping: 33, mass: 0.7 }}
        className="overlay-panel fixed right-3 top-[52px] z-[150] w-[286px] origin-top-right overflow-hidden rounded-[24px] p-2"
      >
        <div className="flex items-center gap-3 px-2.5 py-2.5">
          <Avatar
            name={t('shell.profile.name')}
            size="lg"
            tone="slate"
            status="online"
          />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold tracking-[-0.015em] text-ink">
              {t('shell.profile.name')}
            </p>
            <p className="mt-0.5 text-[10.5px] text-muted">
              {t('shell.userMenu.profileLocal')}
            </p>
            <Badge tone="demo" className="mt-1.5 text-[8.5px]">
              {t('shell.userMenu.demoSession')}
            </Badge>
          </div>
        </div>

        <div className="my-1 h-px bg-line/[0.07]" />

        <div className="space-y-0.5">
          <MenuRow
            icon={Command}
            label={t('shell.userMenu.openCommandCenter')}
            trailing={<Kbd>{commandShortcut}</Kbd>}
            onClick={() => toggleOverlay('command')}
          />
          <MenuRow
            icon={Settings2}
            label={t('shell.userMenu.aetherSettings')}
            trailing={<ChevronRight className="size-3.5 text-muted/60" />}
            onClick={() => navigate('settings')}
          />
          <MenuRow
            icon={resolvedTheme === 'dark' ? Sun : Moon}
            label={
              resolvedTheme === 'dark'
                ? t('shell.userMenu.switchToLight')
                : t('shell.userMenu.switchToDark')
            }
            onClick={toggleTheme}
          />
          <MenuRow
            icon={X}
            label={t('shell.userMenu.closeAllWindows')}
            trailing={
              <span className="text-[10px] tabular-nums text-muted">
                {windows.length > 0 ? windows.length : '0'}
              </span>
            }
            onClick={closeAllWindows}
          />
        </div>

        <div className="mx-1 my-1 h-px bg-line/[0.07]" />

        <div className="flex items-center justify-between px-2.5 py-2">
          <div>
            <p className="text-[9.5px] font-medium uppercase tracking-[0.1em] text-muted">
              Aether OS
            </p>
            <p className="mt-0.5 text-[9px] text-muted/80">
              {t('shell.userMenu.localPrototype')}
            </p>
          </div>
          <span
            className={cn(
              'flex items-center gap-1 rounded-full border border-line/10 px-2 py-1 text-[9px] text-muted',
            )}
          >
            <span className="size-1 rounded-full bg-positive" />
            {t('shell.userMenu.offline')}
          </span>
        </div>
        <p className="px-2.5 pb-1.5 text-[8.5px] leading-relaxed text-muted/70">
          {t('shell.userMenu.demoProfileNote', { appearance: appearanceLabel })}
        </p>
      </motion.section>
    </>
  );
}
