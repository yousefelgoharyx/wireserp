import { Box, Paper, Text, Title } from '@mantine/core';

type Props = {
    title: string;
    children: React.ReactNode;
};
const FormShell = (props: Props) => {
    return (
        <Paper p={16} radius="md">
            <Title order={3}>{props.title}</Title>
            <Box mt={16}>{props.children}</Box>
        </Paper>
    );
};

export default FormShell;
