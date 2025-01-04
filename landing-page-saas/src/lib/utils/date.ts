export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function getMonthDiff(date1: Date, date2: Date) {
  return (
    date1.getMonth() -
    date2.getMonth() +
    12 * (date1.getFullYear() - date2.getFullYear())
  )
}

