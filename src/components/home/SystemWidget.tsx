import { BatteryMedium, HardDrive, Wifi } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { SYSTEM_SNAPSHOT } from '@/data/system';
import { useI18n } from '@/i18n';
import { pct } from '@/lib/format';

export function SystemWidget() {
  const { t, tr } = useI18n();
  const storagePct = pct(
    SYSTEM_SNAPSHOT.storageUsedGb,
    SYSTEM_SNAPSHOT.storageTotalGb,
  );

  return (
    <Card
      aria-label={t('home.system.aria')}
      className="flex flex-1 flex-col p-3 short:p-2.5"
    >
      <div className="flex items-center justify-between px-0.5">
        <h2 className="text-[12px] font-semibold tracking-[-0.01em] text-ink">
          {t('home.system.title')}
        </h2>
        <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted">
          {t('common.demo')}
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-1.5 short:mt-2">
        <div className="flex items-center gap-2 rounded-[10px] border border-line/[0.06] bg-surface/35 px-2 py-1.5">
          <BatteryMedium className="size-3.5 text-positive" strokeWidth={1.8} />
          <div className="min-w-0">
            <p className="text-[10.5px] font-semibold leading-tight text-ink">
              {SYSTEM_SNAPSHOT.battery}%
            </p>
            <p className="text-[9px] text-muted">{t('home.system.battery')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-[10px] border border-line/[0.06] bg-surface/35 px-2 py-1.5">
          <Wifi className="size-3.5 text-accent" strokeWidth={1.8} />
          <div className="min-w-0">
            <p className="truncate text-[10.5px] font-semibold leading-tight text-ink">
              {tr(SYSTEM_SNAPSHOT.network)}
            </p>
            <p className="text-[9px] text-muted">{t('shell.controlCenter.wifi')}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-2.5 short:hidden">
        <div className="flex items-center justify-between text-[9px]">
          <span className="flex items-center gap-1.5 text-muted">
            <HardDrive className="size-2.5" strokeWidth={1.8} />
            {t('home.system.storage')}
          </span>
          <span className="font-medium tabular-nums text-ink-2">
            {SYSTEM_SNAPSHOT.storageUsedGb} / {SYSTEM_SNAPSHOT.storageTotalGb} GB
          </span>
        </div>
        <Progress
          value={storagePct}
          size="xs"
          aria-label={t('home.system.storage')}
          className="mt-1"
        />
      </div>
    </Card>
  );
}
