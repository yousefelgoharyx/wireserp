import { SelectItem } from '@mantine/core';

interface UnitsSelectItem extends SelectItem {
    value: Unit;
}

export const units: UnitsSelectItem[] = [
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
