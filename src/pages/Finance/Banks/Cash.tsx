import { Stack } from '@mantine/core';
import CashForm from './CashForm';
import CashTable from './CashTable';

const Cash = () => {
    return (
        <Stack>
            <CashForm />
            <CashTable />
        </Stack>
    );
};

export default Cash;
