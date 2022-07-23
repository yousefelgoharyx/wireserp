import { NumberInput, NumberInputProps } from '@mantine/core';
import moneyFormatter from '../utils/moneyFormatter';

const MoneyInput = (props: NumberInputProps) => {
    return (
        <NumberInput
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            formatter={moneyFormatter}
            {...props}
        />
    );
};

export default MoneyInput;
