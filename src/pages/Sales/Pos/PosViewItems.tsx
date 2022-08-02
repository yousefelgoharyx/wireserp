import { Stack } from '@mantine/core';
import { useRecoilState } from 'recoil';
import useSettings from '../../../api/useSettings';
import PosProduct from '../../../components/PosProduct';
import invoiceProductsAtom from './atoms/invoiceProducts';

const PosViewItems = () => {
  const [invoiceProducts, setInvoiceProducts] =
    useRecoilState(invoiceProductsAtom);
  const settings = useSettings();

  function handleProductRemove(id: number) {
    setInvoiceProducts(invoiceProducts.filter((p) => p.id !== id));
  }

  return (
    <Stack>
      {invoiceProducts.map((product) => (
        <PosProduct
          key={product.id}
          product={product}
          currency={settings.currency}
          onRemove={handleProductRemove}
        />
      ))}
    </Stack>
  );
};

export default PosViewItems;
