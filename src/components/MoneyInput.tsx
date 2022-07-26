import { NumberInput, NumberInputProps, Text } from '@mantine/core';
import useSettings from '../api/useSettings';
function formatter(value: string) {
  return !Number.isNaN(parseFloat(value))
    ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : '';
}

const MoneyInput = (props: NumberInputProps) => {
  const settings = useSettings();
  return (
    <NumberInput
      step={0.01}
      icon={<Text size="xs">{settings.currency}</Text>}
      formatter={formatter}
      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
      {...props}
    />
  );
};

export default MoneyInput;
