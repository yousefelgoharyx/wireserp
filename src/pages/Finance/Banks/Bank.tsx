import { Stack } from '@mantine/core';
import BankAdd from './BankAdd';
import BankTable from './BankTable';

const Bank = () => {
    return (
        <Stack>
            <BankAdd />
            <BankTable />
        </Stack>
    );
};

export default Bank;
