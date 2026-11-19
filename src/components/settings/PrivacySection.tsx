import { useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SettingsCard } from '@/components/settings/SettingsCard';
import { Toggle } from '@/components/ui/Toggle';
import { useI18n } from '@/i18n';
import { useDemoData } from '@/state/demo-data';
import { useSettings } from '@/state/settings';

export type ResetPhase = 'idle' | 'confirming' | 'done';

interface PrivacySectionProps {
  phase: ResetPhase;
  onPhaseChange: (phase: ResetPhase) => void;
}

export function PrivacySection({ phase, onPhaseChange }: PrivacySectionProps) {
  const { t } = useI18n();
  const { settings, updateSetting, resetSettings } = useSettings();
  const { resetDemoData } = useDemoData();

  const localFacts = [
    t('settings.privacy.localFact1'),
    t('settings.privacy.localFact2'),
    t('settings.privacy.localFact3'),
  ];

  useEffect(() => {
    if (phase !== 'done') return;
    const timer = window.setTimeout(() => onPhaseChange('idle'), 7000);
    return () => window.clearTimeout(timer);
  }, [phase, onPhaseChange]);

  const handleReset = () => {
    resetDemoData();
    resetSettings();
    onPhaseChange('done');
  };

  return (
    <div className="space-y-4">
      <SettingsCard
        title={t('settings.privacy.title')}
        description={t('settings.privacy.description')}
      >
        <div className="divide-y divide-line/[0.06] overflow-hidden rounded-[16px] border border-line/[0.07] bg-surface/40">
          <div data-testid="settings-toggle-memory">
            <Toggle
              className="px-3.5 py-3"
              label={t('settings.privacy.memory.label')}
              description={t('settings.privacy.memory.description')}
              checked={settings.memoryEnabled}
              onChange={(value) => updateSetting('memoryEnabled', value)}
            />
          </div>
          <div data-testid="settings-toggle-local-only">
            <Toggle
              className="px-3.5 py-3"
              label={t('settings.privacy.localOnly.label')}
              description={t('settings.privacy.localOnly.description')}
              checked={settings.localOnly}
              onChange={(value) => updateSetting('localOnly', value)}
            />
          </div>
        </div>
        <p className="mt-3 text-[10px] leading-relaxed text-muted">{t('settings.privacy.note')}</p>
      </SettingsCard>

      <SettingsCard title={t('settings.privacy.localTitle')}>
        <div className="flex items-start gap-3 rounded-[16px] border border-line/[0.07] bg-accent/[0.045] p-3.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-strong">
            <LockKeyhole className="size-[17px]" strokeWidth={1.9} />
          </span>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold text-ink">
              {t('settings.privacy.localHeadline')}
            </p>
            <p className="mt-1 text-[10.5px] leading-relaxed text-muted">
              {t('settings.privacy.localDescription')}
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {localFacts.map((fact) => (
                <li key={fact} className="flex items-start gap-1.5 text-[10px] text-ink-2">
                  <CheckCircle2
                    className="mt-px size-3 shrink-0 text-positive"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span className="leading-relaxed">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        title={t('settings.privacy.reset.title')}
        description={t('settings.privacy.reset.description')}
      >
        {phase === 'idle' && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-line/[0.07] bg-surface/40 px-3.5 py-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-line/[0.06] text-ink-2">
                <RotateCcw className="size-[15px]" strokeWidth={1.9} />
              </span>
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-ink">
                  {t('settings.privacy.reset.rowTitle')}
                </p>
                <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted">
                  {t('settings.privacy.reset.rowDescription')}
                </p>
              </div>
            </div>
            <Button
              variant="danger"
              size="sm"
              leadingIcon={<RotateCcw className="size-3.5" />}
              data-testid="settings-reset-start"
              onClick={() => onPhaseChange('confirming')}
            >
              {t('settings.privacy.reset.start')}
            </Button>
          </div>
        )}

        {phase === 'confirming' && (
          <div
            className="rounded-[16px] border border-warning/25 bg-warning/[0.07] p-3.5"
            data-testid="settings-reset-confirm-panel"
          >
            <div className="flex items-start gap-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-warning/15 text-warning">
                <AlertTriangle className="size-[15px]" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-ink">
                  {t('settings.privacy.reset.confirmTitle')}
                </p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-ink-2">
                  {t('settings.privacy.reset.confirmDescription')}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                data-testid="settings-reset-cancel"
                onClick={() => onPhaseChange('idle')}
              >
                {t('common.cancel')}
              </Button>
              <Button
                variant="danger"
                size="sm"
                leadingIcon={<RotateCcw className="size-3.5" />}
                data-testid="settings-reset-confirm"
                onClick={handleReset}
              >
                {t('settings.privacy.reset.confirm')}
              </Button>
            </div>
          </div>
        )}

        {phase === 'done' && (
          <div
            className="flex items-start gap-3 rounded-[16px] border border-positive/25 bg-positive/[0.07] p-3.5"
            role="status"
            data-testid="settings-reset-success"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-positive/15 text-positive">
              <CheckCircle2 className="size-[17px]" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-ink">
                {t('settings.privacy.reset.doneTitle')}
              </p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-ink-2">
                {t('settings.privacy.reset.doneDescription')}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="shrink-0"
              data-testid="settings-reset-done"
              onClick={() => onPhaseChange('idle')}
            >
              {t('common.done')}
            </Button>
          </div>
        )}

        <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-relaxed text-muted">
          <Sparkles className="mt-px size-3 shrink-0" strokeWidth={1.9} />
          {t('settings.privacy.reset.note')}
        </p>

        <div className="mt-3 flex items-center gap-2 rounded-[12px] border border-line/[0.06] bg-line/[0.02] px-3 py-2 text-[9.5px] text-muted">
          <ShieldCheck className="size-3.5 shrink-0" strokeWidth={1.9} />
          <span>
            {t('settings.privacy.reset.detailPrefix')}{' '}
            <span className="font-semibold text-ink-2">
              {t('settings.privacy.reset.detailDemo')}
            </span>{' '}
            {t('settings.privacy.reset.detailMiddle')}{' '}
            <span className="font-semibold text-ink-2">
              {t('settings.privacy.reset.detailSettings')}
            </span>{' '}
            {t('settings.privacy.reset.detailSuffix')}
          </span>
        </div>
      </SettingsCard>
    </div>
  );
}
