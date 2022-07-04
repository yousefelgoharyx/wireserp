import { Box, createStyles, Loader, Stack, Stepper, Text } from '@mantine/core';

import Step1 from './Step1';
import { useState } from 'react';
import Step2 from './Step2';
import Step3 from './Step3';

function Signup() {
    const { classes } = useStyles();
    const [active, setActive] = useState(0);
    const nextStep = () =>
        setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));

    const handleSubmit = (e) => {
        console.log(e);
    };

    return (
        <Stack className={classes.root}>
            <Stepper
                className={classes.stepper}
                active={active}
                onStepClick={setActive}
                breakpoint="sm"
                styles={{
                    content: {
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    },
                }}
            >
                <Stepper.Step
                    label="Basic Info"
                    description="Fill company's info"
                    allowStepSelect={active > 0 && active < 3}
                >
                    <Step1 onNext={nextStep} />
                </Stepper.Step>
                <Stepper.Step
                    allowStepSelect={active > 1 && active < 3}
                    label="Fiscal year"
                    description="Define fiscal year"
                >
                    <Step2 onNext={nextStep} />
                </Stepper.Step>
                <Stepper.Step
                    label="Admin Info"
                    description="Fill Admin Info"
                    allowStepSelect={active > 2 && active < 3}
                >
                    <Step3 onNext={nextStep} />
                </Stepper.Step>
                <Stepper.Completed>
                    <Stack className={classes.loader} align="center">
                        <Loader size="lg" />
                        <Text>Please Wait...</Text>
                    </Stack>
                </Stepper.Completed>
            </Stepper>
        </Stack>
    );
}

const useStyles = createStyles((theme) => ({
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
}));

export default Signup;
