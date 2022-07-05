import {
    Box,
    Button,
    createStyles,
    Group,
    NumberInput,
    Select,
    Switch,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { useForm, yupResolver } from '@mantine/form';
import { step2Schema } from './Schema';
import StepShell from './StepShell';

const Step2 = (props: StepProps) => {
    const { classes } = useStyles();
    const form = useForm({
        schema: yupResolver(step2Schema),
        initialValues: {
            fiscalYear: '',
            startDate: '',
            endDate: '',
            many: false,
        },
    });
    return (
        <StepShell>
            <form
                className={classes.form}
                onSubmit={form.onSubmit(props.onNext)}
            >
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
                    <Switch
                        size="lg"
                        label="Is there branches"
                        onLabel="Yes"
                        offLabel="No"
                        {...form.getInputProps('many')}
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
