export function formatDateString(date: string) {
  return date.split("T")[0].replaceAll("-", "/")
}