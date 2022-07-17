import { Stack } from '@mantine/core';
import WarehousesForm from './WarehousesForm';
import WarehouseTable from './WarehouseTable';

const Warehouses = () => {
    return (
        <Stack>
            <WarehousesForm />
            <WarehouseTable />
        </Stack>
    );
};

export default Warehouses;
