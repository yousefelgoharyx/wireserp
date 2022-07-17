import { Stack } from '@mantine/core';
import SubCatsForm from './ProductsForm';
import SubCatsTable from './ProductsTable';

const SubCats = () => {
    return (
        <Stack>
            <SubCatsForm />
            <SubCatsTable />
        </Stack>
    );
};

export default SubCats;
