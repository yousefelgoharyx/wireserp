import { useForm, useToggle, upperFirst } from '@mantine/hooks';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Box,
    createStyles,
} from '@mantine/core';

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

function Login(props: PaperProps<'div'>) {
    const { classes } = useStyles();
    const [type, toggle] = useToggle('login', ['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validationRules: {
            email: (val) => /^\S+@\S+$/.test(val),
            password: (val) => val.length >= 6,
        },
    });

    return (
        <Box className={classes.container}>
            <Paper withBorder {...props} className={classes.auth}>
                <Text size="lg" weight={500}>
                    اهلا بك في وايرز
                </Text>

                <Divider labelPosition="center" my="lg" />

                <form
                    className={classes.form}
                    onSubmit={form.onSubmit(() => {})}
                >
                    <Group direction="column" grow>
                        {type === 'register' && (
                            <TextInput
                                label="الاسم"
                                placeholder="اسمك"
                                value={form.values.name}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        'name',
                                        event.currentTarget.value
                                    )
                                }
                            />
                        )}

                        <TextInput
                            required
                            label="البريد الالكتروني"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) =>
                                form.setFieldValue(
                                    'email',
                                    event.currentTarget.value
                                )
                            }
                            error={form.errors.email && 'Invalid email'}
                        />

                        <PasswordInput
                            required
                            label="الرقم السري"
                            placeholder="رقمك السري"
                            value={form.values.password}
                            onChange={(event) =>
                                form.setFieldValue(
                                    'password',
                                    event.currentTarget.value
                                )
                            }
                            error={
                                form.errors.password &&
                                'Password should include at least 6 characters'
                            }
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="اقبل بالشروط"
                                checked={form.values.terms}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        'terms',
                                        event.currentTarget.checked
                                    )
                                }
                            />
                        )}
                    </Group>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="gray"
                            onClick={() => toggle()}
                            size="xs"
                        >
                            {type === 'register'
                                ? 'لديك حساب بالفعل؟ سجل دخولك'
                                : 'ليس لديك حساب؟ سجل حساب جديد'}
                        </Anchor>
                        <Button type="submit">
                            {type === 'login' ? 'دخول' : 'تسجيل'}
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Box>
    );
}

export default Login;
