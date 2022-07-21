import { Stack } from '@mantine/core';
import SafeForm from './SafesForm';
import SafeTable from './SafesTable';

const Safes = () => {
    return (
        <Stack>
            <SafeForm />
            <SafeTable />
        </Stack>
    );
};

export default Safes;
