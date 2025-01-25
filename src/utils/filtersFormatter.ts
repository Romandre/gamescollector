export function getYearTimestamps(year: string) {
  const startOfYear = new Date(`${year}-01-01T00:00:00Z`).getTime() / 1000;
  const endOfYear = new Date(`${year}-12-31T23:59:59Z`).getTime() / 1000;

  return { startOfYear, endOfYear };
}

export function convertToPlural(text: string) {
  return text.endsWith("y") ? text.slice(0, -1) + "ies" : text + "s";
}
