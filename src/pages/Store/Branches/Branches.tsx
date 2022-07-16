import { Stack } from '@mantine/core';
import Provider from './Provider';
import Create from './components/Create';
import View from './components/View';

const Branches = () => {
    return (
        <Provider>
            <Stack spacing={16}>
                <Create />
                <View />
            </Stack>
        </Provider>
    );
};

export default Branches;
