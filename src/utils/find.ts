export default function find<T extends { id: number }>(
    id: number,
    data: T[]
): T {
    const item = data.find((b) => Number(b.id) === Number(id));

    item &&
        Object.keys(item).forEach((key) => {
            if (item[key] === null) item[key] = undefined;
        });
    return item;
}
