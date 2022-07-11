import { useForm, yupResolver } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Group,
    Button,
    Anchor,
    createStyles,
    Alert,
} from '@mantine/core';

import { Link } from 'react-router-dom';
import schema from './Schema';
import AuthForm from '../../components/AuthForm';
import { LanguagePicker } from '../../components/LangPicker';
import { LoginFormValues } from 'login';
import { useAuth } from '../../AuthProvider';
import { AlertTriangle } from 'tabler-icons-react';

function Login() {
    const { classes } = useStyles();
    const { login, status, errors } = useAuth();
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
            </Group>
            <form
                className={classes.form}
                onSubmit={form.onSubmit((v) => login(v))}
            >
                <Group direction="column" grow>
                    <TextInput
                        autoComplete="email"
                        label="Email"
                        placeholder="Enter your email..."
                        {...form.getInputProps('email')}
                    />

                    <PasswordInput
                        autoComplete="password"
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
                {isError && (
                    <Alert
                        icon={<AlertTriangle />}
                        my={16}
                        color="red"
                        title="Oops!"
                    >
                        {errors?.alert || '500 Internal server error'}
                    </Alert>
                )}
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
