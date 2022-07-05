import { Button, createStyles, Group, NumberInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { step2Keys } from './Schema';
import StepShell from './StepShell';
import validateKeys from './validateKeys';

const Step2 = (props: StepProps) => {
    const { classes } = useStyles();
    const { form } = props;
    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = form.validate();
        const isValid = validateKeys(validation.errors, step2Keys);
        if (isValid) {
            props.onNext();
            form.clearErrors();
        }
    };
    return (
        <StepShell>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Group direction="column" grow>
                    <NumberInput
                        label="Fiscal year"
                        placeholder="Type..."
                        hideControls
                        {...form.getInputProps('fiscalYear')}
                    />
                    <DatePicker
                        label="Start Date"
                        placeholder="Select Date"
                        {...form.getInputProps('startDate')}
                    />
                    <DatePicker
                        label="End Date"
                        placeholder="Select Date"
                        {...form.getInputProps('endDate')}
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

export default Step2;
