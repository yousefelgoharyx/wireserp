import { Paper, createStyles, Title, ScrollArea, Box } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        height: '100vh',
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },

    form: {
        height: '100vh',
        borderRight: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[3]
        }`,
        maxWidth: 450,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

export default function AuthenticationImage(props) {
    const { classes } = useStyles();
    return (
        <div className={classes.wrapper}>
            <Paper component={ScrollArea} className={classes.form} radius={0}>
                <Box p={32}>
                    <Title
                        order={2}
                        className={classes.title}
                        align="center"
                        mt="md"
                        mb={50}
                    >
                        Welcome to Wires ERP
                    </Title>
                    {props.children}
                </Box>
            </Paper>
        </div>
    );
}
