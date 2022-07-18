import { Stack } from '@mantine/core';
import TransferForm from './TransferForm';
import TransferTable from './TransferTable';

const Transfer = () => {
    return (
        <Stack>
            <TransferForm />
            <TransferTable />
        </Stack>
    );
};

export default Transfer;
