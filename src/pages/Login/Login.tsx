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
import { LanguagePicker } from '../../components/LangPicker';
import ThemeToggle from '../../components/ThemeToggle';
import { LoginFormValues } from 'login';
import { useAuth } from '../../AuthProvider';

function Login() {
    const { classes } = useStyles();
    const { login, status } = useAuth();
    const form = useForm<LoginFormValues>({
        schema: yupResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },
    });

    const isLoading = status === 'loading';
    const isError = status === 'error';
    return (
        <AuthForm>
            <Group mb={16}>
                <LanguagePicker />
                <ThemeToggle />
            </Group>
            <form
                className={classes.form}
                onSubmit={form.onSubmit((v) => login(v))}
            >
                <Group direction="column" grow>
                    <TextInput
                        label="Email"
                        placeholder="Enter your email..."
                        {...form.getInputProps('email')}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password..."
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
                        Don't have an account? Create one now!
                    </Anchor>
                    <Button loading={isLoading} type="submit">
                        Login
                    </Button>
                </Group>
            </form>
        </AuthForm>
    );
}

const useStyles = createStyles({
    form: {
        width: '100%',
    },
});

export default Login;
