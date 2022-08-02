import { Paper, Stack, Title } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import invoiceProductsAtom from './atoms/invoiceProducts';
import PosViewEmpty from './PosViewEmpty';
import PosViewItems from './PosViewItems';
import PosViewPrice from './PosViewPrice';

const PosView = () => {
  const products = useRecoilValue(invoiceProductsAtom);
  if (products.length === 0) return <PosViewEmpty />;
  return (
    <Stack>
      <Paper shadow="sm" p={16}>
        <Stack>
          <Title order={3}>Products</Title>
          <PosViewItems />
          <PosViewPrice />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default PosView;
