import { Stack } from '@mantine/core';
import BranchesForm from './BranchesForm';
import BranchesTable from './BranchesTable';

const Cats = () => {
    return (
        <Stack>
            <BranchesForm />
            <BranchesTable />
        </Stack>
    );
};

export default Cats;
