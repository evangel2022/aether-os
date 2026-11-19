import { RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { AppearanceSection } from '@/components/settings/AppearanceSection';
import { DesktopSection } from '@/components/settings/DesktopSection';
import { PrivacySection, type ResetPhase } from '@/components/settings/PrivacySection';
import { SettingsNav } from '@/components/settings/SettingsNav';
import { SystemSection } from '@/components/settings/SystemSection';
import { SETTINGS_TABS, type SettingsTabId } from '@/components/settings/settings-options';
import { DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';

export function SettingsPage({ embedded = false }: { embedded?: boolean }) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<SettingsTabId>('appearance');
  const [resetPhase, setResetPhase] = useState<ResetPhase>('idle');

  const active = SETTINGS_TABS.find((tab) => tab.id === activeTab) ?? SETTINGS_TABS[0];

  const requestReset = () => {
    setActiveTab('privacy');
    setResetPhase('confirming');
  };

  const handleTabChange = (tab: SettingsTabId) => {
    setActiveTab(tab);
    if (tab !== 'privacy' && resetPhase === 'confirming') setResetPhase('idle');
  };

  const resetButton = (
    <Button
      variant="secondary"
      size="sm"
      leadingIcon={<RotateCcw className="size-3.5" />}
      title={t('settings.resetShortcutTitle')}
      data-testid="settings-reset-shortcut"
      onClick={requestReset}
    >
      {t('settings.resetDemo')}
    </Button>
  );

  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden page-pad',
        embedded ? 'pb-4 pt-4' : 'pb-6 pt-6',
      )}
      data-testid="settings-page"
      data-embedded={embedded}
    >
      {embedded ? (
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-line/10 bg-surface/50 px-2.5 py-1 text-[9px] font-medium text-muted">
              <span className="size-1 rounded-full bg-positive" aria-hidden />
              {t('settings.savedInBrowser')}
            </span>
            <DemoBadge />
          </div>
          {resetButton}
        </div>
      ) : (
        <PageHeader
          eyebrow={t('settings.eyebrow')}
          title={t('settings.title')}
          description={t('settings.description')}
          actions={
            <>
              {resetButton}
              <DemoBadge />
            </>
          }
        />
      )}

      <div
        className={cn(
          'flex min-h-0 flex-1 flex-col gap-3.5 lg:flex-row',
          embedded ? 'mt-3' : 'mt-5',
        )}
      >
        <SettingsNav activeTab={activeTab} onChange={handleTabChange} />

        <div
          role="tabpanel"
          id={`settings-panel-${activeTab}`}
          aria-labelledby={`settings-tab-${activeTab}`}
          data-testid={`settings-panel-${activeTab}`}
          className="aether-scroll min-h-0 flex-1 overflow-y-auto pb-1 pr-0.5"
        >
          <div className="mb-3 flex items-start justify-between gap-3 pt-0.5">
            <div className="min-w-0">
              <h2 className="text-[14px] font-semibold tracking-[-0.012em] text-ink">
                {t(active.labelKey)}
              </h2>
              <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted">
                {t(active.descriptionKey)}
              </p>
            </div>
            {!embedded && (
              <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-line/10 bg-surface/50 px-2.5 py-1 text-[9px] font-medium text-muted sm:flex">
                <span className="size-1 rounded-full bg-positive" aria-hidden />
                {t('settings.savedInBrowser')}
              </span>
            )}
          </div>

          {activeTab === 'appearance' && <AppearanceSection />}
          {activeTab === 'desktop' && <DesktopSection />}
          {activeTab === 'privacy' && (
            <PrivacySection phase={resetPhase} onPhaseChange={setResetPhase} />
          )}
          {activeTab === 'system' && <SystemSection />}
        </div>
      </div>
    </div>
  );
}
