export function getYearsArray(
  startYear: number = 1980,
  endYear: number = new Date().getFullYear()
) {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(String(year));
  }
  return years.reverse();
}
