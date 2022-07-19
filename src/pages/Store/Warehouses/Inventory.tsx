import { Button, Group, Select, Stack } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React, { Suspense } from 'react';
import useInventory from '../../../api/useInventory';
import {
    useWarehousesList,
    WarehousesToSelectItems,
} from '../../../api/useWarehouses';
import DataGrid from '../../../components/DataGrid';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import Spinner from '../../../components/Spinner';
import getApiError from '../../../utils/getApiError';
import { inventoryListCols } from './columns';
import { inventorySchema } from './schema';

const Inventory = () => {
    const { data: warehouses } = useWarehousesList();
    const { get, isGetting, data } = useInventory();

    const form = useForm<InventoryFormValues>({
        schema: yupResolver(inventorySchema),
        initialValues: {
            from: new Date(),
            to: new Date(),
            warehouse_id: null,
        },
    });

    async function handleSubmit(values: InventoryFormValues) {
        try {
            await get(values);
        } catch (error) {
            showNotification({
                message: getApiError(error.response.data),
            });
        }
    }
    return (
        <Stack>
            <FormShell title="Warehouse Inventory">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <Select
                            data={[
                                ...WarehousesToSelectItems(warehouses),
                                {label: "All warehouses", value: null}
                            ]}
                            placeholder="Select a warehouse"
                            label="Warehouse"
                            {...form.getInputProps('warehouse_id')}
                        />
                        <FormGrid>
                            <DatePicker
                                label="From"
                                placeholder="Select Date"
                                {...form.getInputProps('from')}
                            />
                            <DatePicker
                                label="To"
                                placeholder="Select Date"
                                {...form.getInputProps('to')}
                            />
                        </FormGrid>
                        <FormDivider />
                        <Group>
                            <Button loading={isGetting} type="submit">
                                Show report
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </FormShell>
            <Suspense fallback={<Spinner />}>
                {data && <DataGrid columns={inventoryListCols} data={data} />}
            </Suspense>
        </Stack>
    );
};

export default Inventory;
