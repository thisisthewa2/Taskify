export function formatDate(at: Date) {
  const date = new Date(at)
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
