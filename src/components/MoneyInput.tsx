import { NumberInput, NumberInputProps } from '@mantine/core';
import moneyFormatter from '../utils/moneyFormatter';

const MoneyInput = (props: NumberInputProps) => {
  return (
    <NumberInput
      formatter={moneyFormatter}
      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
      {...props}
    />
  );
};

export default MoneyInput;
