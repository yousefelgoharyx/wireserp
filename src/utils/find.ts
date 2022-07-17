export default function find<T extends { id: number }>(
    id: number,
    data: T[]
): T {
    const item = data.find((b) => b.id === id);

    Object.keys(item).forEach((key) => {
        if (item[key] === null) item[key] = undefined;
    });
    return item;
}
