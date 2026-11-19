import { motion } from 'framer-motion';
import { BellOff, Bot, Brain, CheckCheck, ListChecks, Sparkles, Trash2, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { IconButton } from '@/components/ui/IconButton';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import { useDemoData } from '@/state/demo-data';
import { useDesktop } from '@/state/desktop';
import type { NotificationKind } from '@/types';

const kindStyle: Record<NotificationKind, { icon: LucideIcon; classes: string }> = {
  agent: { icon: Bot, classes: 'bg-[#8b7cf6]/10 text-[#7563e8]' },
  task: { icon: ListChecks, classes: 'bg-accent/10 text-accent' },
  memory: { icon: Brain, classes: 'bg-positive/10 text-positive' },
  system: { icon: Sparkles, classes: 'bg-line/[0.07] text-ink-2' },
};

export function NotificationPanel() {
  const { closeOverlay } = useDesktop();
  const {
    notifications,
    unreadCount,
    markAllNotificationsRead,
    markNotificationRead,
    clearNotifications,
  } = useDemoData();
  const { t, tr } = useI18n();

  return (
    <>
      <button
        type="button"
        aria-label={t('shell.notifications.closeAria')}
        onClick={closeOverlay}
        className="fixed inset-0 z-[140] cursor-default bg-transparent"
      />
      <motion.section
        aria-label={t('shell.notifications.title')}
        initial={{ opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -5, scale: 0.985 }}
        transition={{ type: 'spring', stiffness: 360, damping: 32, mass: 0.75 }}
        className="overlay-panel fixed right-3 top-[52px] z-[150] flex w-[382px] max-w-[calc(100vw-24px)] origin-top-right flex-col overflow-hidden rounded-[26px]"
      >
        <div className="flex items-center justify-between border-b border-line/[0.06] px-4 py-3.5">
          <div className="flex items-center gap-2">
            <h2 className="text-[13px] font-semibold tracking-[-0.015em] text-ink">
              {t('shell.notifications.title')}
            </h2>
            {unreadCount > 0 && (
              <Badge tone="accent" className="px-2 py-0 text-[9px]">
                {t('shell.notifications.new', { count: unreadCount })}
              </Badge>
            )}
            {unreadCount === 0 && (
              <Badge tone="demo">{t('common.demo')}</Badge>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            {notifications.length > 0 && (
              <>
                <IconButton
                  label={t('shell.notifications.markAllRead')}
                  size="sm"
                  onClick={markAllNotificationsRead}
                  disabled={unreadCount === 0}
                >
                  <CheckCheck />
                </IconButton>
                <IconButton
                  label={t('shell.notifications.clearAll')}
                  size="sm"
                  onClick={clearNotifications}
                >
                  <Trash2 />
                </IconButton>
              </>
            )}
            <IconButton
              label={t('shell.notifications.closeAria')}
              size="sm"
              onClick={closeOverlay}
            >
              <X />
            </IconButton>
          </div>
        </div>

        <div className="aether-scroll max-h-[min(520px,calc(100vh-160px))] overflow-y-auto p-2">
          {notifications.length === 0 ? (
            <EmptyState
              compact
              icon={BellOff}
              title={t('shell.notifications.emptyTitle')}
              description={t('shell.notifications.emptyDescription')}
              className="border-0 bg-transparent py-10"
            />
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => {
                const meta = kindStyle[notification.kind];
                const Icon = meta.icon;
                return (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => markNotificationRead(notification.id)}
                    className={cn(
                      'group flex w-full gap-3 rounded-[17px] px-2.5 py-2.5 text-left transition-colors duration-200 hover:bg-line/[0.035]',
                      !notification.read && 'bg-accent/[0.035]',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[10px]',
                        meta.classes,
                      )}
                    >
                      <Icon className="size-4" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-2">
                        <span
                          className={cn(
                            'text-[12px] leading-snug',
                            notification.read
                              ? 'font-medium text-ink-2'
                              : 'font-semibold text-ink',
                          )}
                        >
                          {tr(notification.title)}
                        </span>
                        {!notification.read && (
                          <span
                            className="mt-1 size-1.5 shrink-0 rounded-full bg-accent"
                            aria-label={t('shell.notifications.unreadAria')}
                          />
                        )}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-relaxed text-muted">
                        {tr(notification.body)}
                      </span>
                      <span className="mt-1 block text-[9.5px] font-medium uppercase tracking-[0.06em] text-muted/80">
                        {tr(notification.time)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t border-line/[0.06] px-4 py-2.5 text-[9.5px] text-muted">
          {t('shell.notifications.footer')}
        </div>
      </motion.section>
    </>
  );
}
