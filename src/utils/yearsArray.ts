export function getYearsArray(
  startYear: number = 1970,
  endYear: number = new Date().getFullYear() + 1
) {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(String(year));
  }
  return years.reverse();
}

export function getTimestampTwoMonthsAgo() {
  const now = new Date();
  now.setMonth(now.getMonth() - 2);
  return Math.floor(now.getTime() / 1000);
}
