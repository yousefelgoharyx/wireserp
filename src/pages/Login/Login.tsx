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

const useStyles = createStyles({
    form: {
        width: '100%',
    },
});

export default Login;
