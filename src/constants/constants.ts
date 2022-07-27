import { SelectItem } from '@mantine/core';
interface UnitSelectItem extends SelectItem {
  value: Unit;
}

export const taxOptions = [
  { label: 'Not include tax', value: '0' },
  { label: 'Including tax', value: '1' },
];
export const pricingTypes: PricingSelectItem[] = [
  {
    label: 'Retail',
    value: 'retail',
  },
  { label: 'Wholesale', value: 'wholesale' },
];

export const units: UnitSelectItem[] = [
  {
    label: 'Unit',
    value: 'unit',
  },
  {
    label: 'Kilogram',
    value: 'kg',
  },
  {
    label: 'Gram',
    value: 'gm',
  },
  {
    label: 'Ton',
    value: 'ton',
  },
];
