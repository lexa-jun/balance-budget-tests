export function getTodayText(): string {
  return new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/Moscow',
  }).toLocaleUpperCase('ru-RU');
}

// «ЧЕТВЕРГ, 22 ОКТЯБРЯ»
