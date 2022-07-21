export default function find<T extends { id: number }>(
    id: number,
    data: T[]
): T {
    const item = data.find((b) => Number(b.id) === Number(id));

    return item;
}
