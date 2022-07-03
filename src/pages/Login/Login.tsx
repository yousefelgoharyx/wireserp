import { useForm, yupResolver } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Anchor,
    Box,
    createStyles,
} from '@mantine/core';

import { Link } from 'react-router-dom';
import schema from './Schema';
import AuthForm from '../../components/AuthForm';

function Login(props: PaperProps<'div'>) {
    const { classes } = useStyles();
    const form = useForm({
        schema: yupResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = (e) => {
        console.log(e);
    };

    return (
        <AuthForm>
            <form
                className={classes.form}
                onSubmit={form.onSubmit(handleSubmit)}
            >
                <Group direction="column" grow>
                    <TextInput
                        label="البريد الالكتروني"
                        placeholder="بريدك الالكتروني"
                        {...form.getInputProps('email')}
                    />

                    <PasswordInput
                        label="الرقم السري"
                        placeholder="رقمك السري"
                        {...form.getInputProps('password')}
                    />
                </Group>

                <Group position="apart" mt="xl">
                    <Anchor
                        to="/signup"
                        component={Link}
                        type="button"
                        color="gray"
                        size="xs"
                    >
                        ليس لديك حساب؟ سجل حساب جديد
                    </Anchor>
                    <Button type="submit">دخول</Button>
                </Group>
            </form>
        </AuthForm>
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

export default Login;
