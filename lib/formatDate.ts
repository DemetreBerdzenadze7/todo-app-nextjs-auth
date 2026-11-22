import dayjs from "dayjs";

// "2026-11-22T12:00:00.000Z" → "22 Nov, 2026"
export function formatDate(date: string) {
  return dayjs(date).format("D MMM, YYYY");
}
