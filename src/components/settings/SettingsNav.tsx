import { SETTINGS_TABS, type SettingsTabId } from '@/components/settings/settings-options';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';

interface SettingsNavProps {
  activeTab: SettingsTabId;
  onChange: (tab: SettingsTabId) => void;
}

export function SettingsNav({ activeTab, onChange }: SettingsNavProps) {
  const { t } = useI18n();

  return (
    <nav
      role="tablist"
      aria-label={t('settings.navAria')}
      aria-orientation="vertical"
      className="no-scrollbar flex shrink-0 items-stretch gap-1 overflow-x-auto rounded-[20px] border border-line/[0.07] bg-surface/45 p-1.5 lg:w-[212px] lg:flex-col lg:overflow-visible"
    >
      <p className="eyebrow hidden px-2.5 pb-0.5 pt-1.5 lg:block">{t('settings.sections')}</p>

      {SETTINGS_TABS.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`settings-tab-${tab.id}`}
            aria-selected={active}
            aria-controls={`settings-panel-${tab.id}`}
            data-testid={`settings-tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={cn(
              'group flex min-w-0 shrink-0 items-center gap-2.5 rounded-[14px] px-2.5 py-2 text-left transition-all duration-200 ease-aether lg:w-full lg:items-start lg:py-2.5',
              active
                ? 'bg-surface text-ink shadow-[0_1px_4px_rgb(var(--shadow-tint)/0.09),0_1px_0_rgb(255_255_255/0.4)_inset]'
                : 'text-ink-2 hover:bg-line/[0.04] hover:text-ink',
            )}
          >
            <span
              className={cn(
                'flex size-7 shrink-0 items-center justify-center rounded-[9px] transition-colors duration-200',
                active
                  ? 'bg-accent/10 text-accent-strong'
                  : 'bg-line/[0.05] text-muted group-hover:text-ink-2',
              )}
            >
              <Icon className="size-[14px]" strokeWidth={1.9} />
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] font-medium leading-tight">{t(tab.labelKey)}</span>
              <span className="mt-0.5 hidden truncate text-[10px] leading-tight text-muted lg:block">
                {t(tab.descriptionKey)}
              </span>
            </span>
            {active && (
              <span
                className="ml-auto mt-[5px] hidden size-1.5 shrink-0 rounded-full bg-accent lg:block"
                aria-hidden
              />
            )}
          </button>
        );
      })}

      <div className="mt-auto hidden border-t border-line/[0.06] px-2.5 pb-1.5 pt-3 lg:block">
        <p className="text-[8.5px] font-semibold uppercase tracking-[0.14em] text-muted">
          Aether OS
        </p>
        <p className="mt-1 text-[10px] leading-relaxed text-muted">
          {t('settings.footerVersion')}
          <br />
          {t('settings.footerBuild')}
        </p>
      </div>
    </nav>
  );
}
