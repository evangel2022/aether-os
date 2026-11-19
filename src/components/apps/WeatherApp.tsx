import {
  ArrowDownUp,
  Cloud,
  CloudRain,
  CloudSun,
  Droplets,
  Info,
  MapPin,
  Sun,
  Thermometer,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { DEMO_WEATHER } from '@/data/system';
import { useI18n, type TranslationKey } from '@/i18n';
import { cn } from '@/lib/cn';

type WeatherCondition = 'partly' | 'sun' | 'cloud' | 'rain';

const CONDITION_ICON: Record<WeatherCondition, LucideIcon> = {
  partly: CloudSun,
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
};

const CONDITION_TONE: Record<WeatherCondition, string> = {
  partly: 'text-accent',
  sun: 'text-[#e0a02c] dark:text-[#f0bb55]',
  cloud: 'text-muted',
  rain: 'text-[#4d8fc9] dark:text-[#83bce8]',
};

const CONDITION_KEY: Record<WeatherCondition, TranslationKey> = {
  partly: 'weather.condition.partly',
  sun: 'weather.condition.sun',
  cloud: 'weather.condition.cloud',
  rain: 'weather.condition.rain',
};

const weekLows = DEMO_WEATHER.week.map((day) => day.low);
const weekHighs = DEMO_WEATHER.week.map((day) => day.high);
const rangeMin = Math.min(...weekLows);
const rangeMax = Math.max(...weekHighs);
const rangeSpan = Math.max(1, rangeMax - rangeMin);

function ConditionIcon({
  condition,
  className,
}: {
  condition: WeatherCondition;
  className?: string;
}) {
  const Icon = CONDITION_ICON[condition];
  return <Icon className={className} strokeWidth={1.7} aria-hidden />;
}

function DetailTile({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="glass-card rounded-[18px] p-3.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">{label}</p>
        <span className="flex size-6 items-center justify-center rounded-full bg-accent/[0.08] text-accent">
          <Icon className="size-3.5" strokeWidth={1.8} aria-hidden />
        </span>
      </div>
      <p className="mt-2 text-[15px] font-semibold tracking-[-0.015em] tabular-nums text-ink">
        {value}
      </p>
      <p className="mt-0.5 text-[9px] leading-none text-muted">{hint}</p>
    </div>
  );
}

export function WeatherApp() {
  const { t, tr } = useI18n();
  const location = tr(DEMO_WEATHER.location);

  return (
    <div
      className="aether-scroll h-full overflow-y-auto bg-surface-alt/30"
      data-testid="weather-app"
    >
      <div className="space-y-2.5 p-3.5">
        <section className="relative overflow-hidden rounded-[24px] border border-line/[0.07] bg-accent-soft/75 px-5 pb-4 pt-4">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute -right-8 -top-12 size-36 rounded-full bg-[#ffd98f]/45 blur-2xl dark:bg-[#f0b74a]/20" />
            <span className="absolute right-12 top-3 size-20 rounded-full bg-white/30 blur-xl" />
            <span className="absolute -bottom-14 left-4 h-24 w-48 rounded-[50%] bg-white/25 blur-2xl" />
          </div>

          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-ink-2">
                  <MapPin className="size-3 shrink-0" strokeWidth={2} aria-hidden />
                  {location}
                </p>
                <div className="mt-3 flex items-start">
                  <span
                    className="text-[62px] font-semibold leading-[0.82] tracking-[-0.06em] tabular-nums text-ink"
                    data-testid="weather-temperature"
                  >
                    {DEMO_WEATHER.temperature}
                  </span>
                  <span className="mt-1 text-[24px] font-medium leading-none text-ink-2">°</span>
                </div>
                <p className="mt-2.5 text-[13px] font-medium text-ink">
                  {tr(DEMO_WEATHER.condition)}
                </p>
                <p className="mt-1 text-[10.5px] tabular-nums text-ink-2">
                  {t('weather.highLow', {
                    high: DEMO_WEATHER.high,
                    low: DEMO_WEATHER.low,
                    feels: DEMO_WEATHER.feelsLike,
                  })}
                </p>
              </div>

              <div className="relative mt-0.5 flex size-[102px] shrink-0 items-center justify-center">
                <span className="absolute inset-5 rounded-full bg-[#ffd98f]/40 blur-xl dark:bg-[#f0b74a]/20" />
                <Sun
                  className="absolute -right-1 -top-1 size-8 text-[#e8ab35] drop-shadow-[0_2px_6px_rgb(232_171_53/0.35)] dark:text-[#f0bb55]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <Cloud
                  className="absolute bottom-2 left-0 size-[72px] text-white/90"
                  style={{ fill: 'rgba(255,255,255,0.72)' }}
                  strokeWidth={1.2}
                  aria-hidden
                />
                <Cloud
                  className="absolute bottom-7 right-0 size-10 text-white/85"
                  style={{ fill: 'rgba(255,255,255,0.6)' }}
                  strokeWidth={1.2}
                  aria-hidden
                />
              </div>
            </div>

            <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-ink/[0.07] pt-2.5">
              <span className="text-[8.5px] uppercase tracking-[0.12em] text-ink-2/80">
                {t('weather.today', { location })}
              </span>
              <Badge tone="demo">{t('common.demoData')}</Badge>
            </div>
          </div>
        </section>

        <section
          className="glass-card rounded-[20px] p-3.5"
          aria-label={t('weather.hourly.aria')}
          data-testid="weather-hourly"
        >
          <div className="flex items-baseline justify-between px-0.5">
            <h2 className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-muted">
              {t('weather.hourly.title')}
            </h2>
            <span className="text-[9px] text-muted/80">{t('weather.hourly.next')}</span>
          </div>
          <div className="mt-2 grid grid-cols-6 gap-0.5">
            {DEMO_WEATHER.hourly.map((hour, index) => (
              <div
                key={hour.time['en-US']}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-[12px] px-0.5 py-2',
                  index === 0
                    ? 'bg-accent/[0.09] shadow-[0_0_0_1px_rgb(var(--accent)/0.14)_inset]'
                    : 'hover:bg-line/[0.03]',
                )}
              >
                <span
                  className={cn(
                    'text-[9px] font-medium leading-none',
                    index === 0 ? 'text-accent-strong' : 'text-muted',
                  )}
                >
                  {tr(hour.time)}
                </span>
                <ConditionIcon
                  condition={hour.condition}
                  className={cn('size-[18px]', CONDITION_TONE[hour.condition])}
                />
                <span className="text-[11.5px] font-semibold leading-none tabular-nums text-ink">
                  {hour.temp}°
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="glass-card rounded-[20px] p-3.5"
          aria-label={t('weather.weekly.aria')}
          data-testid="weather-weekly"
        >
          <div className="flex items-baseline justify-between px-0.5">
            <h2 className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-muted">
              {t('weather.weekly.title')}
            </h2>
            <span className="text-[9px] text-muted/80">{t('weather.weekly.highLow')}</span>
          </div>
          <div className="mt-1.5 divide-y divide-line/[0.06]">
            {DEMO_WEATHER.week.map((day) => {
              const lowPct = ((day.low - rangeMin) / rangeSpan) * 100;
              const highPct = ((day.high - rangeMin) / rangeSpan) * 100;
              return (
                <div key={day.day['en-US']} className="flex items-center gap-2.5 py-[7px]">
                  <span className="w-8 shrink-0 text-[10.5px] font-medium text-ink-2">
                    {tr(day.day)}
                  </span>
                  <ConditionIcon
                    condition={day.condition}
                    className={cn('size-4 shrink-0', CONDITION_TONE[day.condition])}
                  />
                  <span className="w-6 shrink-0 text-right text-[9.5px] tabular-nums text-muted">
                    {day.low}°
                  </span>
                  <div className="relative h-[3px] min-w-6 flex-1 overflow-hidden rounded-full bg-line/[0.08]">
                    <span
                      className="absolute inset-y-0 rounded-full"
                      style={{
                        left: `${lowPct}%`,
                        right: `${100 - highPct}%`,
                        background: 'linear-gradient(90deg, #9dc8f5, #f0c069)',
                      }}
                      aria-hidden
                    />
                  </div>
                  <span className="w-6 shrink-0 text-[10px] font-medium tabular-nums text-ink">
                    {day.high}°
                  </span>
                  <span className="w-[62px] shrink-0 truncate text-right text-[8.5px] text-muted">
                    {t(CONDITION_KEY[day.condition])}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-2.5">
          <DetailTile
            icon={Droplets}
            label={t('weather.detail.humidity')}
            value={`${DEMO_WEATHER.humidity}%`}
            hint={t('weather.detail.humidityHint')}
          />
          <DetailTile
            icon={Wind}
            label={t('weather.detail.wind')}
            value={tr(DEMO_WEATHER.wind)}
            hint={t('weather.detail.windHint')}
          />
          <DetailTile
            icon={Thermometer}
            label={t('weather.detail.feelsLike')}
            value={`${DEMO_WEATHER.feelsLike}°`}
            hint={t('weather.detail.feelsLikeHint')}
          />
          <DetailTile
            icon={ArrowDownUp}
            label={t('weather.detail.range')}
            value={`${DEMO_WEATHER.low}° – ${DEMO_WEATHER.high}°`}
            hint={t('weather.detail.rangeHint')}
          />
        </div>

        <p className="flex items-start gap-1.5 px-1 pb-1 text-[9px] leading-relaxed text-muted">
          <Info className="mt-px size-3 shrink-0" strokeWidth={1.9} aria-hidden />
          <span>
            {t('weather.footnotePrefix')}{' '}
            <code className="rounded bg-line/[0.06] px-1 py-px font-mono text-[8.5px] text-ink-2">
              src/data/system.ts
            </code>
            {t('weather.footnoteSuffix')}
          </span>
        </p>
      </div>
    </div>
  );
}
