export function formatDateAndTime(dateString: string) {
  const date = new Date(dateString);
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}, ${date.getDate().toString().padStart(2, "0")} ${date.toLocaleString("en-GB", { month: "short" })} ${date.getFullYear()}`;
}
