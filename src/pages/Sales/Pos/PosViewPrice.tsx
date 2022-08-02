import { Stack, Text } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import useSettings from '../../../api/useSettings';
import getTaxPrice from '../../../utils/getTaxPrice';
import moneyFormatter from '../../../utils/moneyFormatter';
import invoiceInfoAtom from './atoms/invoiceInfo';
import invoiceProductsAtom from './atoms/invoiceProducts';

const PosViewPrice = () => {
  const invoiceInfo = useRecoilValue(invoiceInfoAtom);
  const invoiceProducts = useRecoilValue(invoiceProductsAtom);
  console.log(invoiceProducts);

  const settings = useSettings();
  const totalPrice = invoiceProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <Stack spacing={4}>
      <Text size="md" weight={700}>
        Total : {moneyFormatter(totalPrice)} {settings.currency}
      </Text>

      <Text size="md" weight={700}>
        Total after taxes :{' '}
        {moneyFormatter(
          getTaxPrice(
            totalPrice,
            invoiceInfo.withTax ? settings.tax_value_added : 0
          )
        )}{' '}
        {settings.currency}
      </Text>
    </Stack>
  );
};

export default PosViewPrice;
