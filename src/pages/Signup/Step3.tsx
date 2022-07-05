import {
    Box,
    Button,
    createStyles,
    Group,
    NumberInput,
    PasswordInput,
    TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { step3Schema } from './Schema';
import StepShell from './StepShell';

const Step3 = (props: StepProps) => {
    const { classes } = useStyles();
    const form = useForm({
        schema: yupResolver(step3Schema),
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
        },
    });
    return (
        <StepShell>
            <form
                className={classes.form}
                onSubmit={form.onSubmit(props.onNext)}
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
                    <Button onClick={props.onPrev} variant="outline">
                        Back
                    </Button>
                    <Button type="submit">Next</Button>
                </Group>
            </form>
        </StepShell>
    );
};

const useStyles = createStyles({
    form: {
        width: '100%',
        maxWidth: 550,
    },
});

export default Step3;
