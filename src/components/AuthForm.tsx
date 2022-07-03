import { Text, Paper, Divider, Box, createStyles } from '@mantine/core';
type Props = {
    children: React.ReactNode;
};
function AuthForm(props: Props) {
    const { classes } = useStyles();

    return (
        <Box className={classes.container}>
            <Paper withBorder className={classes.auth}>
                <Text size="lg" weight={500}>
                    اهلا بك في وايرز
                </Text>

                <Divider labelPosition="center" my="lg" />

                {props.children}
            </Paper>
        </Box>
    );
}

const useStyles = createStyles((theme) => ({
    container: {
        height: '100vh',
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    auth: {
        maxWidth: 400,
        width: '100%',
        margin: 32,
        padding: theme.spacing.xl,
        borderRadius: theme.spacing.xs,
        '@media (max-width: 475px)': {
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    form: {
        width: '100%',
    },
}));

export default AuthForm;
