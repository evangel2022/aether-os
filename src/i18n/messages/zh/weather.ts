import type { WeatherMessages } from '@/i18n/messages/en/weather';

const weather = {
  'weather.condition.partly': '多云间晴',
  'weather.condition.sun': '晴',
  'weather.condition.cloud': '阴',
  'weather.condition.rain': '雨',
  'weather.highLow': '最高 {high}° · 最低 {low}° · 体感 {feels}°',
  'weather.today': '{location} 今日天气',
  'weather.hourly.title': '逐小时',
  'weather.hourly.next': '未来 6 小时',
  'weather.hourly.aria': '逐小时预报',
  'weather.weekly.title': '本周',
  'weather.weekly.highLow': '最高 / 最低',
  'weather.weekly.aria': '一周预报',
  'weather.detail.humidity': '湿度',
  'weather.detail.humidityHint': '体感舒适',
  'weather.detail.wind': '风力',
  'weather.detail.windHint': '微风',
  'weather.detail.feelsLike': '体感温度',
  'weather.detail.feelsLikeHint': '略凉',
  'weather.detail.range': '今日温差',
  'weather.detail.rangeHint': '早晨偏凉，午后温和',
  'weather.footnotePrefix': '模拟天气数据来自',
  'weather.footnoteSuffix': '。不会访问定位、天气 API，也不发起网络请求。',
} satisfies Record<keyof WeatherMessages, string>;

export default weather;
