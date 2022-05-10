export function transformDuration(duration: number): string {
  const date = new Date(0);
  date.setSeconds(duration * 60);
  const [h, m] = date.toISOString().slice(11, 16).split(':');
  const hours = +h ? `${+h} ч` : '';
  return `${hours} ${m} мин`
}
