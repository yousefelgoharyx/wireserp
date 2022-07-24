import {
    Button,
    Group,
    NumberInput,
    Select,
    Stack,
    Textarea,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import dayjs from 'dayjs';
import {
    productsToSelectItems,
    useProductsList,
} from '../../../api/store/useProducts';
import useTransfer from '../../../api/store/useTransfer';
import {
    useWarehousesList,
    WarehousesToSelectItems,
} from '../../../api/store/useWarehouses';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import getApiError from '../../../utils/getApiError';
import { transferScheme } from './schema';

const TransferForm = () => {
    const { data: warehouses } = useWarehousesList();
    const { data: products } = useProductsList();
    const transferOwner = useTransfer();
    const form = useForm<TransferFormValues>({
        schema: yupResolver(transferScheme),
        initialValues: {
            date: new Date(),
            from_warehouse: null,
            to_warehouse: null,
            product_id: null,
            notes: '',
            quantity: 1,
        },
    });

    async function handleSubmit(values: TransferFormValues) {
        const newValues: KosomAhmedIbrahim = {
            ...values,
            date: dayjs(values.date).format('YYYY-MM-DD'),
        };
        try {
            await transferOwner.transfer(newValues);
            showNotification({
                message: 'Transfer success',
            });
            form.reset();
        } catch (error) {
            showNotification({
                message: getApiError(error.response.data),
            });
        }
    }

    function handleFromWarehouseChange(value) {
        form.setFieldValue('from_warehouse', value);
        form.setFieldValue('product_id', null);
        form.setFieldValue('to_warehouse', null);
    }

    let fromWarehouses = warehouses.filter(
        (warehouse) => warehouse.id !== +form.values.to_warehouse
    );
    let toWarehouses = warehouses.filter(
        (warehouse) => warehouse.id !== +form.values.from_warehouse
    );

    let filteredProducts = products.filter(
        (product) => product.warehouse_id === +form.values.from_warehouse
    );

    return (
        <FormShell title="Transfer between warehouses">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <FormGrid>
                        <Select
                            data={WarehousesToSelectItems(fromWarehouses)}
                            label="From warehouse"
                            placeholder="Select warehouse"
                            clearable
                            {...form.getInputProps('from_warehouse')}
                            onChange={handleFromWarehouseChange}
                        />
                        <Select
                            data={WarehousesToSelectItems(toWarehouses)}
                            label="To warehouse"
                            placeholder="Select warehouse"
                            {...form.getInputProps('to_warehouse')}
                        />

                        <Select
                            disabled={!form.values.from_warehouse}
                            data={productsToSelectItems(filteredProducts)}
                            label="Product"
                            placeholder="Select product"
                            {...form.getInputProps('product_id')}
                        />
                        <NumberInput
                            label="Quantity"
                            hideControls
                            {...form.getInputProps('quantity')}
                        />

                        <DatePicker
                            label="Date"
                            placeholder="Select Date"
                            {...form.getInputProps('date')}
                        />
                        <Textarea
                            label="Note"
                            placeholder="Type..."
                            autosize
                            maxRows={4}
                            {...form.getInputProps('notes')}
                        />
                    </FormGrid>
                    <FormDivider />
                    <Group>
                        <Button
                            loading={transferOwner.isTransfering}
                            type="submit"
                        >
                            Transfer
                        </Button>
                    </Group>
                </Stack>
            </form>
        </FormShell>
    );
};

export default TransferForm;
