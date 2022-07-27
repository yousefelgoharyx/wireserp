import { Button, NumberInput, Select, Stack } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
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
import { pricingTypes, taxOptions, units } from '../../../constants/constants';
import { withTax, stringify } from '../../../utils/all';
import find from '../../../utils/find';
import toSelectItems from '../../../utils/toSelectItems';
import { getProductPrice } from './controller/invoiceUtils';

type Props = {
  onSubmit: (data: InvoiceForm) => void;
  isLoading: boolean;
  form: UseFormReturnType<InvoiceForm>;
  status: 'creating' | 'adding';
};

const InvoicesForm = (props: Props) => {
  const { data: clients } = useClientsList();
  const { data: warehouses } = useWarehousesList();
  const { data: products } = useProductsList();
  const settings = useSettings();
  const [tax, setTax] = useState(settings.tax_value_added);
  const [priceType, setPriceType] = useState<PricingType>(
    pricingTypes[0].value
  );
  const [product, setProduct] = useState<Product>(null);
  const { form } = props;

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
    const price = getProductPrice(product, priceType);
    setProduct(product);
    form.setValues({
      ...form.values,
      product_id: +v,
      product_price: price,
      quantity: 1,
      quantity_price: price,
      final_total: withTax(price, tax),
      unit: product.product_unit,
    });
  }

  function handleTaxChange(v) {
    form.setFieldValue('value_added_tax', v);
    let newTax = v === '1' ? settings.tax_value_added : 0;
    setTax(newTax);
  }

  function handleQuantityChange(quantity: number) {
    form.setFieldValue('quantity', quantity);
    if (quantity !== undefined) {
      let quantityPrice = form.values.product_price * quantity;
      form.setFieldValue('quantity_price', quantityPrice);
      form.setFieldValue('final_total', withTax(quantityPrice, tax));
    } else {
      form.setFieldValue('quantity_price', form.values.product_price);
      form.setFieldValue(
        'final_total',
        withTax(form.values.product_price, tax)
      );
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
        form.setFieldValue('final_total', withTax(productPrice, tax));
      }
    } else {
      form.setFieldValue('quantity_price', undefined);
      form.setFieldValue('final_total', undefined);
    }
  }

  function handleTotalPriceChange(v: number) {
    form.setFieldValue('quantity_price', v);
    form.setFieldValue('final_total', withTax(v, tax));
  }

  function handlePriceTypeChange(v: PricingType) {
    setPriceType(v);
    const price = getProductPrice(product, v);
    form.setValues({
      ...form.values,
      product_price: price,
      quantity: 1,
      quantity_price: price,
      final_total: withTax(price, tax),
    });
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
              data={taxOptions}
              rightSectionWidth={120}
              rightSection={<Tax />}
              {...form.getInputProps('value_added_tax')}
              onChange={handleTaxChange}
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
                  data={pricingTypes}
                  value={priceType}
                  onChange={handlePriceTypeChange}
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
              min={1}
              max={product?.warehouse_balance ?? 0}
              rightSection={
                <Select
                  disabled={isDisabled}
                  data={units}
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
              value={form.values.final_total}
            />
          </FormGrid>
          <FormDivider />
          <Button loading={props.isLoading} type="submit">
            {props.status === 'adding' ? 'Add product' : 'Create invoice'}
          </Button>
        </Stack>
      </form>
    </FormShell>
  );
};

export default InvoicesForm;
