import useCreate from '../../../hooks/useCreate';
import InvoicesForm from './InvoicesForm';
import { showNotification } from '@mantine/notifications';
import getApiError from './../../../utils/getApiError';
import { useState } from 'react';
import { useForm, yupResolver } from '@mantine/form';
import { SaleBillForm } from './model/schema';
import DataGrid from '../../../components/DataGrid';
import { useProductsList } from './../../../api/useProducts';
import find from '../../../utils/find';
import { salesCols } from './model/columns';
import { Stack } from '@mantine/core';

const Invoices = () => {
  const form = useForm<SaleBillForm>({
    validate: yupResolver(SaleBillForm),
    initialValues: {
      client_id: null,
      date_time: new Date(),
      warehouse_id: null,
      value_added_tax: '1',
      final_total: undefined,
      product_id: null,
      product_price: undefined,
      quantity: undefined,
      unit: 'unit',
      quantity_price: undefined,
    },
  });
  const [billId, setBillId] = useState<number>(null);
  const [billItems, setBillItems] = useState<SaleBillForm[]>([]);
  const { data: products } = useProductsList();
  const { create, isCreating } = useCreate<SaleBillForm, { id: number }>(
    ['sale-bills'],
    '/sale-bills'
  );
  const { create: add, isCreating: isAdding } = useCreate<AddProductForm>(
    ['sale-bills'],
    '/product-to-bill'
  );
  const salesData: SaleBillTable[] = billItems.map((bill) => ({
    product_name: find(bill.product_id, products).product_name,
    product_price: bill.product_price,
    amount: `${bill.quantity} ${bill.unit}`,
    total_price: bill.final_total,
  }));

  async function handleSubmit(values: SaleBillForm) {
    try {
      if (billId) {
        await add({
          product_id: values.product_id,
          product_price: values.product_price,
          quantity: values.quantity,
          quantity_price: values.quantity_price,
          final_total: values.final_total,
          sale_bill_id: billId,
          unit: values.unit,
        });
        setBillItems([...billItems, values]);
        showNotification({
          message: 'Added product to invoice',
        });
      } else {
        const response = await create(values);
        setBillId(response.id);
        setBillItems([...billItems, values]);
        showNotification({
          message: 'Invoice created successfully',
        });
      }
      form.setValues({
        ...form.values,
        product_id: null,
        product_price: undefined,
        quantity: undefined,
        quantity_price: undefined,
        final_total: undefined,
      });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }
  return (
    <Stack>
      <InvoicesForm
        form={form}
        onSubmit={handleSubmit}
        isAdding={!!billId}
        isLoading={isCreating || isAdding}
      />
      {salesData.length > 0 && (
        <DataGrid data={salesData} columns={salesCols} />
      )}
    </Stack>
  );
};

export default Invoices;
