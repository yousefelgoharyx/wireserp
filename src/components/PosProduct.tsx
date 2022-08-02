import {
  ActionIcon,
  CloseButton,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import moneyFormatter from '../utils/moneyFormatter';

type Props = {
  product: PosProduct;
  currency: string;
  onRemove: (id: number) => void;
};
const PosProduct = (props: Props) => {
  return (
    <Paper
      p={16}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[2],
      })}
    >
      <Group>
        <Stack spacing={4} sx={{ flex: 1 }}>
          <Text size="lg" transform="uppercase" weight={700}>
            {props.product.name} : {props.product.quantity}
          </Text>
          <Text color="dimmed" weight={700} size="xs">
            {moneyFormatter(props.product.price)} {props.currency} *{' '}
            {props.product.quantity} ={' '}
            {moneyFormatter(props.product.price * props.product.quantity)}{' '}
            {props.currency}
          </Text>
        </Stack>
        <ActionIcon>
          <CloseButton onClick={() => props.onRemove(props.product.id)} />
        </ActionIcon>
      </Group>
    </Paper>
  );
};

export default PosProduct;
