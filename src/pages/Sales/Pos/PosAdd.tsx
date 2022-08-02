import { Paper, Stack } from '@mantine/core';
import { useRecoilState } from 'recoil';
import invoiceProductsAtom from './atoms/invoiceProducts';
import PosAddForm from './PosAddForm';

const PosAdd = () => {
  const [invoiceProducts, setInvoiceProducts] =
    useRecoilState(invoiceProductsAtom);

  function handleProductAdd(values: PosProduct) {
    const existingProduct = invoiceProducts.find((p) => p.id === values.id);
    if (existingProduct) {
      const newProducts = invoiceProducts.filter(
        (p) => p.id !== existingProduct.id
      );
      const newProduct = { ...existingProduct };
      newProduct.quantity += values.quantity;
      newProducts.push(newProduct);
      setInvoiceProducts(newProducts);
    } else {
      const newProducts = [...invoiceProducts];
      newProducts.push({ ...values });
      setInvoiceProducts(newProducts);
    }
  }
  return (
    <Stack>
      <Paper shadow="sm" p={16}>
        <PosAddForm onAdd={handleProductAdd} />
      </Paper>
    </Stack>
  );
};

export default PosAdd;
