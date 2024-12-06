export function formatDate(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  if (date.toString() === "Invalid Date") {
    throw new Error("The given timestamp is invalid");
  }

  const day = date.getDate();
  const month = date.getMonth();

  const DD = day < 10 ? `0${day}` : day;
  const MM = month + 1 < 10 ? `0${month + 1}` : month + 1;
  const YYYY = date.getFullYear();

  return `${DD}/${MM}/${YYYY}`;
}
