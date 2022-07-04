import { useForm, yupResolver } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Group,
    Button,
    Anchor,
    createStyles,
    Select,
    NumberInput,
} from '@mantine/core';
import AuthForm from '../../components/AuthForm';
import schema from './Schema';
import { Link } from 'react-router-dom';

function Signup() {
    const { classes } = useStyles();
    const form = useForm({
        schema: yupResolver(schema),
        initialValues: {
            companyName: '',
            phone: '',
            country: '',
            currency: '',
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
                        label="اسم الشركة"
                        placeholder="ادخل اسم الشركة"
                        {...form.getInputProps('companyName')}
                    />
                    <NumberInput
                        label="رقم هاتف الشركة"
                        placeholder="ادخل رقم الهاتف"
                        rightSectionWidth={70}
                        hideControls
                        {...form.getInputProps('phone')}
                    />
                    <Select
                        label="الدولة"
                        placeholder="اختر الدولة"
                        nothingFound="لا يوجد شيء"
                        searchable
                        data={[
                            { value: 'react', label: 'React' },
                            { value: 'ng', label: 'Angular' },
                            { value: 'svelte', label: 'Svelte' },
                            { value: 'vue', label: 'Vue' },
                        ]}
                        {...form.getInputProps('country')}
                    />

                    <Select
                        label="العملة"
                        placeholder="اختر العملة"
                        nothingFound="لا يوجد شيء"
                        searchable
                        data={[
                            { value: 'react', label: 'React' },
                            { value: 'ng', label: 'Angular' },
                            { value: 'svelte', label: 'Svelte' },
                            { value: 'vue', label: 'Vue' },
                        ]}
                        {...form.getInputProps('currency')}
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

const useStyles = createStyles({
    form: {
        width: '100%',
    },
});

export default Signup;
