export default function moneyFormatter(value: string) {
    return !Number.isNaN(parseFloat(value))
        ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : '';
}
