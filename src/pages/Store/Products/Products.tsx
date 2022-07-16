import { Stack } from '@mantine/core';
import ProductsProvider from './ProductsProvider';
import Create from './Create';
import Read from './Read';

const Products = () => {
    return (
        <ProductsProvider>
            <Stack spacing={16}>
                <Create />
                <Read />
            </Stack>
        </ProductsProvider>
    );
};

export default Products;
