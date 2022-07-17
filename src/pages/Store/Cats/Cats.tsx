import { Stack } from '@mantine/core';
import CatsForm from './CatsForm';
import CatsTable from './CatsTable';

const Cats = () => {
    return (
        <Stack>
            <CatsForm />
            <CatsTable />
        </Stack>
    );
};

export default Cats;
