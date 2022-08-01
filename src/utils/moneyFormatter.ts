export default function moneyFormatter(value: any) {
  return !Number.isNaN(parseFloat(value))
    ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : '0.00';
}
