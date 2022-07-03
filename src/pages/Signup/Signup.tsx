import { useForm, yupResolver } from '@mantine/form';
import { TextInput, PasswordInput, Group, Button, Anchor } from '@mantine/core';
import AuthForm from '../../components/AuthForm';
import schema from './Schema';
import { Link } from 'react-router-dom';

function Signup() {
    const form = useForm({
        schema: yupResolver(schema),
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const handleSubmit = (e) => {
        console.log(e);
    };

    return (
        <AuthForm>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Group direction="column" grow>
                    <TextInput
                        label="الاسم"
                        placeholder="ادخل اسمك"
                        {...form.getInputProps('name')}
                    />
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
                        to="/login"
                        component={Link}
                        type="button"
                        color="gray"
                        size="xs"
                    >
                        لديك حساب؟ سجل دخول
                    </Anchor>
                    <Button type="submit">دخول</Button>
                </Group>
            </form>
        </AuthForm>
    );
}

export default Signup;
