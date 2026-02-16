export const formatTime = (time: string, locale: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  const date = new Date(Date.UTC(2020, 0, 1, hours, minutes))
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).format(date)
}
