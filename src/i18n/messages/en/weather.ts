const weather = {
  'weather.condition.partly': 'Partly cloudy',
  'weather.condition.sun': 'Sunny',
  'weather.condition.cloud': 'Cloudy',
  'weather.condition.rain': 'Rain',
  'weather.highLow': 'H {high}° · L {low}° · Feels like {feels}°',
  'weather.today': 'Today in {location}',
  'weather.hourly.title': 'Hourly',
  'weather.hourly.next': 'Next 6 hours',
  'weather.hourly.aria': 'Hourly forecast',
  'weather.weekly.title': 'This week',
  'weather.weekly.highLow': 'High / low',
  'weather.weekly.aria': 'Weekly forecast',
  'weather.detail.humidity': 'Humidity',
  'weather.detail.humidityHint': 'Comfortable',
  'weather.detail.wind': 'Wind',
  'weather.detail.windHint': 'Light breeze',
  'weather.detail.feelsLike': 'Feels like',
  'weather.detail.feelsLikeHint': 'Slightly cool',
  'weather.detail.range': "Today's range",
  'weather.detail.rangeHint': 'Cool start, mild afternoon',
  'weather.footnotePrefix': 'Mock weather seeded in',
  'weather.footnoteSuffix':
    '. No location access, weather API or network request is made.',
} as const;

export type WeatherMessages = typeof weather;
export default weather;
