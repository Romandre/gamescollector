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
