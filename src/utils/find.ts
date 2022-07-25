export default function find<T extends { id: number }>(
  id: number,
  data: T[]
): T {
  const item = data.find((b) => +b.id === +id);

  return item;
}
