import { Box, createStyles, Paper, Title } from '@mantine/core';

type Props = {
    title: string;
    children: React.ReactNode;
};
const FormShell = (props: Props) => {
    const { classes } = useStyles();
    return (
        <Paper radius="md" className={classes.root}>
            <Box className={classes.titleWrapper}>
                <Title order={3}>{props.title}</Title>
            </Box>
            <Box p={16} pt={0}>
                <Box mt={16}>{props.children}</Box>
            </Box>
        </Paper>
    );
};

const useStyles = createStyles((theme) => ({
    root: {
        overflow: 'hidden',
    },
    titleWrapper: {
        padding: theme.spacing.md,
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
    },
}));

export default FormShell;
