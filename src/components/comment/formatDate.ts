export function formatDate(at: Date) {
  const utcDate = new Date(at);
  const kstDate = new Date(utcDate.getTime() - 9 * 60 * 60 * 1000);

  const date = kstDate
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(/\s/g, '')
    .replace(/\.(?=\d{2}:\d{2})/, ' ');

  return date;
}
