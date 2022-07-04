import {
    Box,
    Button,
    createStyles,
    Group,
    NumberInput,
    PasswordInput,
    Select,
    TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { step1Schema } from './Schema';
type Props = {
    onNext: () => void;
};

const Step3 = (props: Props) => {
    const { classes } = useStyles();
    const form = useForm({
        schema: yupResolver(step1Schema),
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
        },
    });
    return (
        <Box className={classes.root}>
            <form
                className={classes.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onNext();
                }}
            >
                <Group direction="column" grow>
                    <TextInput
                        label="System manager name"
                        placeholder="Enter..."
                        {...form.getInputProps('name')}
                    />
                    <NumberInput
                        label="Phone"
                        placeholder="Enter..."
                        rightSectionWidth={70}
                        hideControls
                        {...form.getInputProps('phone')}
                    />
                    <TextInput
                        label="email"
                        placeholder="Enter..."
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        label="Country"
                        placeholder="Choose"
                        {...form.getInputProps('password')}
                    />
                </Group>

                <Group grow mt="xl">
                    <Button type="submit">Next</Button>
                </Group>
            </form>
        </Box>
    );
};

const useStyles = createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    form: {
        width: '100%',
        maxWidth: 550,
    },
});

export default Step3;
