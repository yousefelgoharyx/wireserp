import { createStyles, Loader, Stack, Stepper, Text } from '@mantine/core';

import Step1 from './Step1';
import { useState } from 'react';
import Step2 from './Step2';
import Step3 from './Step3';
import { useForm, yupResolver } from '@mantine/form';
import { stepsSchema, initialValues } from './Schema';
import Final from './Final';

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
    const form = useForm({
        schema: yupResolver(stepsSchema),
        initialValues,
    });

    const nextStep = () =>
        setActive((current) =>
            current < steps.length ? current + 1 : current
        );
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));

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
                        />
                    </Stepper.Step>
                ))}

                <Stepper.Completed>
                    <Final form={form} />
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
});

export default Signup;
