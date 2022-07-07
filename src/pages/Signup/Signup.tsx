import {
    Alert,
    createStyles,
    Loader,
    Stack,
    Stepper,
    Text,
} from '@mantine/core';

import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import dayjs from 'dayjs';
import { useForm, yupResolver } from '@mantine/form';
import { stepsSchema, initialValues } from './Schema';
import { useAuth } from '../../AuthProvider';
import { SignupFormValues } from 'signup';

const steps = [
    {
        label: 'Basic Info',
        description: "Fill company's info",
        component: Step1,
    },
    {
        label: 'Fiscal year',
        description: 'Define fiscal year',
        component: Step2,
    },
    {
        label: 'Admin Info',
        description: 'Fill admin info',
        component: Step3,
    },
];

const stepperStyles = {
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    steps: {
        marginBottom: 32,
    },
};

function Signup() {
    const { classes } = useStyles();
    const [active, setActive] = useState(0);
    const { signup, status } = useAuth();
    const form = useForm<SignupFormValues>({
        schema: yupResolver(stepsSchema),
        initialValues,
    });

    const nextStep = () =>
        setActive((current) =>
            current < steps.length ? current + 1 : current
        );
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));
    function handleSignup() {
        const newForm: any = { ...form.values };
        newForm.fiscal_start_date = dayjs(form.values.fiscal_start_date).format(
            'YYYY-MM-DD'
        );
        newForm.fiscal_end_date = dayjs(form.values.fiscal_end_date).format(
            'YYYY-MM-DD'
        );
        signup(newForm);
    }
    return (
        <Stack className={classes.root}>
            <Stepper
                className={classes.stepper}
                active={active}
                onStepClick={setActive}
                breakpoint="sm"
                styles={stepperStyles as any}
            >
                {steps.map((step, i) => (
                    <Stepper.Step
                        label={step.label}
                        description={step.description}
                        allowStepSelect={active > i && active < steps.length}
                        key={i}
                    >
                        <step.component
                            form={form}
                            onNext={nextStep}
                            onPrev={prevStep}
                            handleSignup={handleSignup}
                        />
                    </Stepper.Step>
                ))}

                <Stepper.Completed>
                    {status === 'loading' && (
                        <Stack className={classes.loader} align="center">
                            <Loader size="lg" />
                            <Text>Please Wait...</Text>
                        </Stack>
                    )}
                    {status === 'error' && (
                        <Alert title="Oops">
                            Something went wrong. Please try again later.
                        </Alert>
                    )}
                </Stepper.Completed>
            </Stepper>
        </Stack>
    );
}

const useStyles = createStyles({
    root: {
        minHeight: '100vh',
        alignItems: 'stretch',
        padding: 32,
        maxWidth: 992,
        margin: '0 auto',
    },
    stepper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    loader: {
        justifyContent: 'center',
        flex: 1,
    },
});

export default Signup;
