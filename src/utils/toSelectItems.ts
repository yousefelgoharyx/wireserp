type Mark<T> = {
    valueKey: keyof T;
    labelKey: string;
};
function toSelectItems<T>(data: T[], marks: Mark<T>) {
    return data.map((item) => ({
        value: item[marks.valueKey].toString(),
        label: item[marks.labelKey],
    }));
}

export default toSelectItems;
