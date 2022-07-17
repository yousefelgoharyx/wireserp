import { Group, Stack } from '@mantine/core';
import ProductsForm from './ProductsForm';
import ProductsTable from './ProductsTable';

const SubCats = () => {
    return (
        <Stack>
            <ProductsForm />
            {/* <ProductsTable /> */}
        </Stack>
    );
};

export default SubCats;
