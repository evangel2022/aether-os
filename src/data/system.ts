import { localized } from '@/i18n/localized';
import type { SystemSnapshot } from '@/types';

/** All device telemetry is simulated for the UI prototype. */
export const SYSTEM_SNAPSHOT: SystemSnapshot = {
  battery: 86,
  charging: false,
  network: localized('Aether-5G', 'Aether-5G'),
  signal: 3,
  storageUsedGb: 186,
  storageTotalGb: 512,
  memoryUsedPct: 43,
  cpuPct: 18,
  uptime: localized('6 小时 24 分', '6h 24m'),
};

/**
 * Bilingual mock weather for the Weather mini-app. Every user-visible string
 * carries both languages so the app never mixes copy between locales.
 */
export const DEMO_WEATHER = {
  location: localized('旧金山', 'San Francisco'),
  condition: localized('多云间晴', 'Partially cloudy'),
  temperature: 18,
  high: 21,
  low: 12,
  feelsLike: 17,
  humidity: 64,
  wind: localized('11 公里/小时', '11 km/h'),
  hourly: [
    { time: localized('现在', 'Now'), temp: 18, condition: 'partly' },
    { time: localized('14:00', '2 PM'), temp: 19, condition: 'partly' },
    { time: localized('15:00', '3 PM'), temp: 20, condition: 'sun' },
    { time: localized('16:00', '4 PM'), temp: 21, condition: 'sun' },
    { time: localized('17:00', '5 PM'), temp: 19, condition: 'partly' },
    { time: localized('18:00', '6 PM'), temp: 17, condition: 'cloud' },
  ],
  week: [
    { day: localized('周二', 'Tue'), high: 21, low: 12, condition: 'partly' },
    { day: localized('周三', 'Wed'), high: 19, low: 11, condition: 'cloud' },
    { day: localized('周四', 'Thu'), high: 17, low: 10, condition: 'rain' },
    { day: localized('周五', 'Fri'), high: 20, low: 12, condition: 'sun' },
  ],
} as const;
