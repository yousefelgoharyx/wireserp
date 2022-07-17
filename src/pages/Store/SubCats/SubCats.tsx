import { Stack } from '@mantine/core';
import SubCatsForm from './SubCatsForm';
import SubCatsTable from './SubCatsTable';

const SubCats = () => {
    return (
        <Stack>
            <SubCatsForm />
            <SubCatsTable />
        </Stack>
    );
};

export default SubCats;
