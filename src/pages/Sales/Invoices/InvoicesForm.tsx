import { Button, NumberInput, Select, Stack, Text } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
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
import getTaxPrice from '../../../utils/getTaxPrice';
import stringify from '../../../utils/stringify';
import toSelectItems from '../../../utils/toSelectItems';
import { unitSelect } from '../../../utils/units';
import { SaleBillForm } from './model/schema';

type Props = {
  onSubmit: (data: SaleBillForm) => void;
};
const InvoicesForm = (props: Props) => {
  const { data: clients } = useClientsList();
  const { data: warehouses } = useWarehousesList();
  const { data: products } = useProductsList();
  const settings = useSettings();
  const form = useForm<SaleBillForm>({
    validate: yupResolver(SaleBillForm),
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
      final_total: undefined,
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
      final_total: product.total_price,
    });
  }

  function handleTaxChange(v) {
    form.setFieldValue('value_added_tax', +v);
    let newTax = +v ? settings.tax_value_added : 0;
    setTax(newTax);
  }

  function handleQuantityChange(quantity: number) {
    form.setFieldValue('quantity', quantity);
    if (quantity !== undefined) {
      let quantityPrice = form.values.product_price * quantity;
      form.setFieldValue('quantity_price', quantityPrice);
      form.setFieldValue('final_total', quantityPrice);
    } else {
      form.setFieldValue('quantity_price', form.values.product_price);
      form.setFieldValue('final_total', form.values.product_price);
    }
  }

  function handleProductPriceChange(productPrice: number) {
    form.setFieldValue('product_price', productPrice);
    if (productPrice !== undefined) {
      if (form.values.quantity) {
        let quantityPrice = form.values.quantity * productPrice;
        form.setFieldValue('quantity_price', quantityPrice);
        form.setFieldValue('final_total', quantityPrice);
      } else {
        form.setFieldValue('quantity_price', productPrice);
        form.setFieldValue('final_total', productPrice);
      }
    } else {
      form.setFieldValue('quantity_price', undefined);
      form.setFieldValue('final_total', undefined);
    }
  }

  function handleTotalPriceChange(v: number) {
    form.setFieldValue('quantity_price', v);
    form.setFieldValue('final_total', v);
  }

  let isDisabled =
    !form.values.product_id || form.values.value_added_tax === null;
  return (
    <FormShell title="Create invoice">
      <form onSubmit={form.onSubmit(props.onSubmit)}>
        <Stack>
          <FormGrid>
            <Select
              data={clientSelect}
              label="Client"
              placeholder="Select client"
              {...form.getInputProps('client_id')}
              onChange={(v) => form.setFieldValue('client_id', +v)}
              value={stringify(form.values.client_id)}
            />
            <Select
              data={warehouseSelect}
              label="Warehouse"
              placeholder="Select warehouse"
              {...form.getInputProps('warehouse_id')}
              onChange={handleWarehouseChange}
              value={stringify(form.values.warehouse_id)}
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
              value={stringify(form.values.value_added_tax)}
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
              value={stringify(form.values.product_id)}
            />
            <MoneyInput
              disabled={isDisabled}
              hideControls
              label="Product Price"
              placeholder="Enter price"
              rightSection={
                <Select
                  disabled={isDisabled}
                  data={[
                    {
                      label: 'Retail',
                      value: 'retail',
                    },
                    { label: 'Wholesale', value: 'wholesale' },
                  ]}
                  defaultValue="retail"
                />
              }
              rightSectionWidth={112}
              {...form.getInputProps('product_price')}
              onChange={handleProductPriceChange}
            />
            <NumberInput
              label="Quantity"
              placeholder="Enter quantity"
              hideControls
              rightSection={
                <Select
                  disabled={isDisabled}
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
              onChange={handleTotalPriceChange}
            />
            <MoneyInput
              disabled={isDisabled}
              label="Final price"
              placeholder="Enter price"
              hideControls
              {...form.getInputProps('final_total')}
              value={getTaxPrice(form.values.final_total, tax)}
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
