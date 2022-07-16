import { Stack } from '@mantine/core';
import Provider from './CategoriesContext';
import Create from './Create';
import Read from './Read';

const Categories = () => {
    return (
        <Provider>
            <Stack spacing={16}>
                <Create />
                <Read />
            </Stack>
        </Provider>
    );
};

export default Categories;
