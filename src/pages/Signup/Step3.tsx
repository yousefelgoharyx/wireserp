import {
    Button,
    createStyles,
    Group,
    NumberInput,
    PasswordInput,
    TextInput,
} from '@mantine/core';
import { useEffect } from 'react';
import { step3Keys } from './Schema';
import StepShell from './StepShell';
import validateKeys from './validateKeys';

const Step3 = (props: StepProps) => {
    const { classes } = useStyles();
    const { form } = props;
    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = form.validate();
        const isValid = validateKeys(validation.errors, step3Keys);
        if (isValid) {
            props.onNext();
            props.handleSignup();
        }
    };
    return (
        <StepShell>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Group direction="column" grow>
                    <TextInput
                        label="System manager name"
                        placeholder="Enter..."
                        {...form.getInputProps('manager_name')}
                    />
                    <NumberInput
                        label="Phone"
                        placeholder="Enter..."
                        rightSectionWidth={70}
                        hideControls
                        {...form.getInputProps('manager_phone')}
                    />
                    <TextInput
                        label="Email"
                        placeholder="Enter..."
                        {...form.getInputProps('manager_email')}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Choose"
                        {...form.getInputProps('manager_password')}
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
