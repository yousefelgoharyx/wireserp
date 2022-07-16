import { Stack } from '@mantine/core';
import Provider from './SubCategoriesContext';
import Create from './Create';
import Read from './Read';

const SubCategories = () => {
    return (
        <Provider>
            <Stack spacing={16}>
                <Create />
                <Read />
            </Stack>
        </Provider>
    );
};

export default SubCategories;
