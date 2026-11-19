import {
  BatteryCharging,
  BatteryMedium,
  Cpu,
  Clock3,
  HardDrive,
  Info,
  MemoryStick,
  Network,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { LogoMark } from '@/components/brand/Logo';
import { SettingsCard } from '@/components/settings/SettingsCard';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { SYSTEM_SNAPSHOT } from '@/data/system';
import { useI18n } from '@/i18n';
import { pct } from '@/lib/format';

type ProgressTone = 'accent' | 'positive' | 'warning' | 'neutral';

interface MetricTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
  progress?: number;
  progressTone?: ProgressTone;
  children?: ReactNode;
}

function MetricTile({
  icon: Icon,
  label,
  value,
  hint,
  progress,
  progressTone = 'accent',
  children,
}: MetricTileProps) {
  const { t } = useI18n();

  return (
    <div className="rounded-[16px] border border-line/[0.07] bg-surface/40 p-3.5">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.09em] text-muted">
          <Icon className="size-3.5" strokeWidth={1.9} aria-hidden />
          {label}
        </span>
        {children}
      </div>
      <p className="mt-2.5 text-[17px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-ink">
        {value}
      </p>
      <p className="mt-1.5 text-[10px] leading-none text-muted">{hint}</p>
      {typeof progress === 'number' && (
        <Progress
          value={progress}
          tone={progressTone}
          size="xs"
          label={t('settings.system.device.usageAria', { label })}
          className="mt-2.5"
        />
      )}
    </div>
  );
}

function SignalBars({ level }: { level: number }) {
  return (
    <span className="flex items-end gap-[2px]" aria-hidden>
      {[1, 2, 3, 4].map((bar) => (
        <span
          key={bar}
          className={
            bar <= level
              ? 'w-[3px] rounded-full bg-accent'
              : 'w-[3px] rounded-full bg-line/20'
          }
          style={{ height: `${3 + bar * 2}px` }}
        />
      ))}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line/[0.05] py-2 last:border-0">
      <span className="text-[11px] text-muted">{label}</span>
      <span className="text-[11px] font-medium text-ink">{value}</span>
    </div>
  );
}

const storagePct = pct(SYSTEM_SNAPSHOT.storageUsedGb, SYSTEM_SNAPSHOT.storageTotalGb);

export function SystemSection() {
  const { t, tr } = useI18n();

  return (
    <div className="space-y-4">
      <SettingsCard
        title={t('settings.system.device.title')}
        description={t('settings.system.device.description')}
        action={<DemoBadge />}
      >
        <div className="grid gap-2.5 sm:grid-cols-2">
          <MetricTile
            icon={SYSTEM_SNAPSHOT.charging ? BatteryCharging : BatteryMedium}
            label={t('settings.system.device.battery')}
            value={`${SYSTEM_SNAPSHOT.battery}%`}
            hint={t(
              SYSTEM_SNAPSHOT.charging
                ? 'settings.system.device.charging'
                : 'settings.system.device.onBattery',
            )}
            progress={SYSTEM_SNAPSHOT.battery}
            progressTone="positive"
          />
          <MetricTile
            icon={Network}
            label={t('settings.system.device.network')}
            value={tr(SYSTEM_SNAPSHOT.network)}
            hint={t('settings.system.device.connected')}
          >
            <SignalBars level={SYSTEM_SNAPSHOT.signal} />
          </MetricTile>
          <MetricTile
            icon={HardDrive}
            label={t('settings.system.device.storage')}
            value={`${SYSTEM_SNAPSHOT.storageUsedGb} GB`}
            hint={t('settings.system.device.storageHint', {
              total: SYSTEM_SNAPSHOT.storageTotalGb,
              used: storagePct,
            })}
            progress={storagePct}
          />
          <MetricTile
            icon={MemoryStick}
            label={t('settings.system.device.memory')}
            value={`${SYSTEM_SNAPSHOT.memoryUsedPct}%`}
            hint={t('settings.system.device.memoryHint')}
            progress={SYSTEM_SNAPSHOT.memoryUsedPct}
          />
          <MetricTile
            icon={Cpu}
            label={t('settings.system.device.cpu')}
            value={`${SYSTEM_SNAPSHOT.cpuPct}%`}
            hint={t('settings.system.device.cpuHint')}
            progress={SYSTEM_SNAPSHOT.cpuPct}
          />
          <MetricTile
            icon={Clock3}
            label={t('settings.system.device.uptime')}
            value={tr(SYSTEM_SNAPSHOT.uptime)}
            hint={t('settings.system.device.uptimeHint')}
          />
        </div>
        <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-relaxed text-muted">
          <Info className="mt-px size-3 shrink-0" strokeWidth={1.9} />
          <span>
            {t('settings.system.device.notePrefix')}{' '}
            <code className="rounded bg-line/[0.06] px-1 py-px font-mono text-[9.5px] text-ink-2">
              src/data/system.ts
            </code>
            {t('settings.system.device.noteSuffix')}
          </span>
        </p>
      </SettingsCard>

      <SettingsCard
        title={t('settings.system.about.title')}
        description={t('settings.system.about.description')}
        action={<DemoBadge />}
      >
        <div className="flex items-center gap-3 rounded-[16px] border border-line/[0.07] bg-surface/40 p-3.5">
          <LogoMark size={42} />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold tracking-[-0.015em] text-ink">Aether OS</p>
            <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted">
              {t('settings.system.about.tagline')}
            </p>
          </div>
          <Badge tone="neutral" className="shrink-0">
            UI-1
          </Badge>
        </div>

        <div className="mt-3 rounded-[16px] border border-line/[0.07] bg-surface/40 px-3.5 py-1.5">
          <InfoRow
            label={t('settings.system.about.version')}
            value={t('settings.system.about.versionValue')}
          />
          <InfoRow
            label={t('settings.system.about.build')}
            value={t('settings.system.about.buildValue')}
          />
          <InfoRow
            label={t('settings.system.about.interface')}
            value={t('settings.system.about.interfaceValue')}
          />
          <InfoRow
            label={t('settings.system.about.state')}
            value={t('settings.system.about.stateValue')}
          />
        </div>

        <div className="mt-3 rounded-[16px] border border-line/[0.07] bg-accent/[0.045] p-3.5">
          <p className="flex items-center gap-1.5 text-[11.5px] font-semibold text-ink">
            <Sparkles className="size-3.5 text-accent" strokeWidth={1.9} aria-hidden />
            {t('settings.system.about.prototypeTitle')}
          </p>
          <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted">
            {t('settings.system.about.prototypeBody')}
          </p>
        </div>

        <div
          className="mt-3 flex items-start gap-2 rounded-[12px] border border-dashed border-line/20 px-3 py-2.5"
          data-testid="settings-demo-notice"
        >
          <Info className="mt-px size-3.5 shrink-0 text-muted" strokeWidth={1.9} aria-hidden />
          <p className="text-[9.5px] leading-relaxed text-muted">
            <span className="font-semibold uppercase tracking-[0.1em] text-ink-2">
              {t('settings.system.about.demoNoticeTitle')}
            </span>{' '}
            {t('settings.system.about.demoNoticeBody')}
          </p>
        </div>
      </SettingsCard>
    </div>
  );
}
