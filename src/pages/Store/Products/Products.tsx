import { Stack } from '@mantine/core';
import Provider from './Provider';
import Create from './components/Create';
import Read from './components/View';

const Products = () => {
    return (
        <Provider>
            <Stack spacing={16}>
                <Create />
                <Read />
            </Stack>
        </Provider>
    );
};

export default Products;
