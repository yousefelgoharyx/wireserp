import { Button, NumberInput, Paper, Select, Stack } from '@mantine/core';
import { useState } from 'react';
import { useProductsList } from '../../../api/store/useProducts';
import CountOfInput from '../../../components/CountOfInput';
import FormDivider from '../../../components/FormDivider';
import MoneyInput from '../../../components/MoneyInput';
import { stringify } from '../../../utils/all';
import { usePosContext } from './context/PosContext';

type Props = {
  onAdd: (product: PosProductForm) => void;
};
const PosAddForm = (props: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(null);
  const { data: productsData, selectItems: products } = useProductsList();
  const { addProductForm } = usePosContext();

  function handleProductChange(v: string) {
    const product = productsData.find((p) => p.id === +v);
    setSelectedProduct(product);
    addProductForm.setFieldValue('id', +v);
    addProductForm.setFieldValue('price', product.piece_price);
    addProductForm.setFieldValue('quantity', 1);
  }

  function handleQuantityChange(quantity: number) {
    addProductForm.setFieldValue('quantity', quantity);
    addProductForm.setFieldValue(
      'price',
      selectedProduct.piece_price * quantity
    );
  }
  return (
    <Paper p={16}>
      <form onSubmit={addProductForm.onSubmit(props.onAdd)}>
        <Stack>
          <Select
            data={products}
            label="Product"
            placeholder="Select Product"
            {...addProductForm.getInputProps('id')}
            onChange={handleProductChange}
            value={stringify(addProductForm.values.id)}
          />
          <NumberInput
            disabled={!addProductForm.values.id}
            max={selectedProduct ? selectedProduct.warehouse_balance : 0}
            label="Quantity"
            precision={0}
            placeholder="Enter Quantity"
            hideControls
            {...addProductForm.getInputProps('quantity')}
            onChange={handleQuantityChange}
          />
          <MoneyInput
            label="Total price"
            placeholder="Total price"
            disabled
            value={addProductForm.values.price}
          />
          <FormDivider />
          <Button type="submit">Add</Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default PosAddForm;
