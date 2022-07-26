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
  const [bill, setBill] = useState(null);
  const [billItems, setBillItems] = useState<SaleBillForm[]>([]);
  const { data: products } = useProductsList();
  const { create, isCreating } = useCreate<SaleBillForm>(
    ['sale-bills'],
    '/sale-bills'
  );
  const salesData: SaleBillTable[] = billItems.map((bill) => ({
    product_name: find(bill.product_id, products).product_name,
    product_price: bill.product_price,
    amount: `${bill.quantity} ${bill.unit}`,
    total_price: bill.final_total,
  }));

  async function handleSubmit(values: SaleBillForm) {
    try {
      await create(values);
      setBillItems([...billItems, values]);
      showNotification({
        message: 'Invoice created successfully',
      });
      form.reset();
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
        isLoading={isCreating}
      />
      {salesData.length > 0 && (
        <DataGrid data={salesData} columns={salesCols} />
      )}
    </Stack>
  );
};

export default Invoices;
