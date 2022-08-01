import {
  ActionIcon,
  CloseButton,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import useSettings from '../../../api/useSettings';
import FormDivider from '../../../components/FormDivider';
import getTaxPrice from '../../../utils/getTaxPrice';
import moneyFormatter from '../../../utils/moneyFormatter';
import { usePosContext } from './context/PosContext';

const PosViewItems = () => {
  const { products, invoiceInfo, removeProduct } = usePosContext();
  const settings = useSettings();
  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  if (products.length === 0)
    return (
      <Stack align="center" justify="center" sx={{ flexGrow: 1 }}>
        <Text color="dimmed" size="lg" weight={700}>
          Add Products
        </Text>
      </Stack>
    );
  return (
    <Stack>
      {products.map((product) => (
        <Paper withBorder p={16}>
          <Group>
            <Stack spacing={4} sx={{ flex: 1 }}>
              <Text size="lg" transform="uppercase" weight={700}>
                {product.name} : {product.quantity}
              </Text>
              <Text color="dimmed" weight={700} size="xs">
                {moneyFormatter(product.price)} {settings.currency} *{' '}
                {product.quantity} ={' '}
                {moneyFormatter(product.price * product.quantity)}{' '}
                {settings.currency}
              </Text>
            </Stack>
            <ActionIcon>
              <CloseButton onClick={() => removeProduct(product.id)} />
            </ActionIcon>
          </Group>
        </Paper>
      ))}
      <Paper withBorder p={16}>
        <Stack>
          <Text size="md" weight={700}>
            Total : {moneyFormatter(totalPrice)} {settings.currency}
          </Text>
          {invoiceInfo.withTax && (
            <Text size="md" weight={700}>
              Total after taxes :{' '}
              {moneyFormatter(
                getTaxPrice(totalPrice, settings.tax_value_added)
              )}{' '}
              {settings.currency}
            </Text>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default PosViewItems;
