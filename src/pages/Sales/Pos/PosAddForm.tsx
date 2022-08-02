import { Button, NumberInput, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useProductsList } from '../../../api/store/useProducts';
import FormDivider from '../../../components/FormDivider';
import MoneyInput from '../../../components/MoneyInput';
import { stringify } from '../../../utils/all';

type Props = {
  onAdd: (product: PosProduct) => void;
};
const PosAddForm = (props: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(null);
  const { data: productsData, selectItems: products } = useProductsList();
  const addProductForm = useForm<PosProductForm>({
    initialValues: {
      id: null,
      price: 0,
      quantity: 0,
    },
  });

  function handleProductChange(v: string) {
    const product = productsData.find((p) => p.id === +v);
    setSelectedProduct(product);
    addProductForm.setFieldValue('id', +v);
    addProductForm.setFieldValue('price', product.piece_price);
    addProductForm.setFieldValue('quantity', 1);
  }

  function handleQuantityChange(quantity: number) {
    addProductForm.setFieldValue('quantity', quantity);
    addProductForm.setFieldValue('price', selectedProduct.piece_price);
  }

  function handleSubmit(values: PosProductForm) {
    const product = productsData.find((p) => p.id === values.id);
    props.onAdd({ ...values, name: product.product_name });
    addProductForm.reset();
  }
  return (
    <form onSubmit={addProductForm.onSubmit(handleSubmit)}>
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
          label="Piece price"
          placeholder="Total price"
          disabled
          value={addProductForm.values.price}
        />
        <MoneyInput
          label="Total price"
          placeholder="Total price"
          disabled
          value={addProductForm.values.price * addProductForm.values.quantity}
        />
        <FormDivider />
        <Button type="submit" disabled={!addProductForm.values.id}>
          Add
        </Button>
      </Stack>
    </form>
  );
};

export default PosAddForm;
