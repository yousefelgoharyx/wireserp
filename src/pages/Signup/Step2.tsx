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
type Props = {
    onNext: () => void;
};

const Step2 = (props: Props) => {
    const { classes } = useStyles();
    const form = useForm({
        schema: yupResolver(step2Schema),
        initialValues: {
            companyName: '',
            startDate: '',
            endDate: '',
            many: '',
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
                    <NumberInput
                        label="Fiscal year"
                        placeholder="Type..."
                        hideControls
                        {...form.getInputProps('companyName')}
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
                    <Button type="submit">التالي</Button>
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

export default Step2;
