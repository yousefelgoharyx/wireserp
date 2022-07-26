import { SelectItem } from '@mantine/core';

interface UnitsSelectItem extends SelectItem {
  value: Unit;
}

export const unitSelect: UnitsSelectItem[] = [
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

export const units = ['Unit', 'Kilogram', 'Gram', 'Ton'];
