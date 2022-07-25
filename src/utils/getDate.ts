export default function getDate(date: Date) {
  return new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
}
