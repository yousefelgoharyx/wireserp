import { Button, NumberInput, Select, Stack, Text } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useClientsList } from '../../../api/debts/useClients';
import { useProductsList } from '../../../api/store/useProducts';
import { useWarehousesList } from '../../../api/store/useWarehouses';
import useSettings from '../../../api/useSettings';
import CountOfInput from '../../../components/CountOfInput';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import MoneyInput from '../../../components/MoneyInput';
import Tax from '../../../components/Tax';
import find from '../../../utils/find';
import getTaxOf from '../../../utils/getTaxOf';
import toSelectItems from '../../../utils/toSelectItems';
import { unitSelect } from '../../../utils/units';

const InvoicesForm = () => {
  const { data: clients } = useClientsList();
  const { data: warehouses } = useWarehousesList();
  const { data: products } = useProductsList();
  const settings = useSettings();
  const form = useForm<SaleBillForm>({
    initialValues: {
      client_id: null,
      date_time: new Date(),
      warehouse_id: null,
      value_added_tax: 1,
      final_total: undefined,
      product_id: null,
      product_price: undefined,
      quantity: undefined,
      unit: 'unit',
      quantity_price: undefined,
    },
  });

  const [tax, setTax] = useState(settings.tax_value_added);
  const [product, setProduct] = useState<Product>(null);

  const clientSelect = toSelectItems<Client>(clients, {
    labelKey: 'c_name',
    valueKey: 'id',
  });
  const warehouseSelect = toSelectItems<Warehouse>(warehouses, {
    labelKey: 'warehouse_name',
    valueKey: 'id',
  });
  const productSelect = toSelectItems<Product>(
    products.filter(
      (product) => +product.warehouse_id === +form.values.warehouse_id
    ),
    {
      labelKey: 'product_name',
      valueKey: 'id',
    }
  );

  function handleTimeChange(v: Date) {
    const timeDate = dayjs(v);
    const date = dayjs(form.values.date_time)
      .hour(timeDate.hour())
      .minute(timeDate.minute())
      .second(timeDate.second())
      .millisecond(timeDate.millisecond());
    form.setFieldValue('date_time', date.toDate());
  }
  function handleWarehouseChange(v: string) {
    form.setValues({
      ...form.values,
      warehouse_id: +v,
      product_id: null,
      product_price: undefined,
      quantity: undefined,
      quantity_price: undefined,
    });
  }
  function handleProductChange(v: string) {
    const product = find(+v, products);
    setProduct(product);
    form.setValues({
      ...form.values,
      product_id: +v,
      product_price: product.total_price,
      quantity: 1,
      quantity_price: product.total_price,
      final_total: getTaxOf(product.total_price, tax),
    });
  }

  function handleTaxChange(v) {
    form.setFieldValue('value_added_tax', +v);
    let newTax;
    if (+v) newTax = settings.tax_value_added;
    else newTax = 0;
    setTax(newTax);
    if (form.values.quantity_price) {
      form.setFieldValue(
        'final_total',
        getTaxOf(form.values.quantity_price, newTax)
      );
    }
  }

  function handleQuantityChange(quantity: number) {
    form.setFieldValue('quantity', quantity);
    if (quantity !== undefined) {
      let quantityPrice = form.values.product_price * quantity;
      let finalPrice = getTaxOf(quantityPrice, tax);
      form.setFieldValue('quantity_price', quantityPrice);
      form.setFieldValue('final_total', finalPrice);
    } else {
      form.setFieldValue('quantity_price', form.values.product_price);
      form.setFieldValue(
        'final_total',
        getTaxOf(form.values.product_price, tax)
      );
    }
  }

  function handleProductPriceChange(productPrice: number) {
    form.setFieldValue('product_price', productPrice);
    if (productPrice !== undefined) {
      if (form.values.quantity) {
        let quantityPrice = form.values.quantity * productPrice;
        let finalPrice = getTaxOf(quantityPrice, tax);
        form.setFieldValue('quantity_price', quantityPrice);
        form.setFieldValue('final_total', finalPrice);
      } else {
        let finalPrice = getTaxOf(productPrice, tax);
        form.setFieldValue('quantity_price', productPrice);
        form.setFieldValue('final_total', finalPrice);
      }
    } else {
      form.setFieldValue('quantity_price', undefined);
      form.setFieldValue('final_total', undefined);
    }
  }

  function handleSubmit() {
    console.log(form.values);
  }

  let isDisabled =
    !form.values.product_id || form.values.value_added_tax === null;
  return (
    <FormShell title="Create invoice">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <FormGrid>
            <Select
              data={clientSelect}
              label="Client"
              placeholder="Select client"
              {...form.getInputProps('client_id')}
              onChange={(v) => form.setFieldValue('client_id', +v)}
              value={form.values.client_id?.toString() ?? null}
            />
            <Select
              data={warehouseSelect}
              label="Warehouse"
              placeholder="Select warehouse"
              {...form.getInputProps('warehouse_id')}
              onChange={handleWarehouseChange}
              value={form.values.warehouse_id?.toString() ?? null}
            />
            <DatePicker
              label="Invoice date"
              placeholder="Select date"
              {...form.getInputProps('date_time')}
            />
            <TimeInput
              label="Invoice time"
              placeholder="Enter time"
              {...form.getInputProps('date_time')}
              onChange={handleTimeChange}
            />
            <Select
              label="Taxes"
              placeholder="Select"
              data={[
                { label: 'Not include tax', value: '0' },
                { label: 'Including tax', value: '1' },
              ]}
              rightSectionWidth={120}
              rightSection={<Tax />}
              {...form.getInputProps('value_added_tax')}
              onChange={handleTaxChange}
              value={form.values.value_added_tax?.toString() ?? null}
            />
            <Select
              searchable
              label="Product"
              placeholder="Select a product"
              disabled={!form.values.warehouse_id}
              data={productSelect}
              rightSectionWidth={120}
              rightSection={
                <CountOfInput count={product?.warehouse_balance ?? ''} />
              }
              {...form.getInputProps('product_id')}
              onChange={handleProductChange}
              value={form.values.product_id?.toString() ?? null}
            />
            <MoneyInput
              disabled={isDisabled}
              hideControls
              label="Product Price"
              placeholder="Enter price"
              {...form.getInputProps('product_price')}
              onChange={handleProductPriceChange}
            />
            <NumberInput
              label="Quantity"
              placeholder="Enter quantity"
              hideControls
              rightSection={
                <Select
                  disabled={
                    !form.values.product_id ||
                    !form.values.value_added_tax !== null
                  }
                  data={unitSelect}
                  {...form.getInputProps('unit')}
                />
              }
              rightSectionWidth={112}
              disabled={isDisabled}
              {...form.getInputProps('quantity')}
              onChange={handleQuantityChange}
            />
            <MoneyInput
              disabled={isDisabled}
              label="Total price"
              placeholder="Enter price"
              hideControls
              {...form.getInputProps('quantity_price')}
            />
            <MoneyInput
              disabled={isDisabled}
              label="Final price"
              placeholder="Enter price"
              hideControls
              {...form.getInputProps('final_total')}
            />
          </FormGrid>
          <FormDivider />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </FormShell>
  );
};

export default InvoicesForm;
