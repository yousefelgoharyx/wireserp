import { Group, Loader } from '@mantine/core';

const Spinner = () => {
    return (
        <Group sx={{ height: '100%' }} position="center" align="center">
            <Loader size="lg" />
        </Group>
    );
};

export const FullSpinner = () => {
    return (
        <Group align="center" position="center" sx={{ height: '100vh' }}>
            <Loader size="xl" />
        </Group>
    );
};

export default Spinner;
