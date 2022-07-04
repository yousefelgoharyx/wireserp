import {
    Box,
    Button,
    createStyles,
    Group,
    NumberInput,
    Select,
    TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { step1Schema } from './Schema';
type Props = {
    onNext: () => void;
};

const Step1 = (props: Props) => {
    const { classes } = useStyles();
    const form = useForm({
        schema: yupResolver(step1Schema),
        initialValues: {
            companyName: '',
            phone: '',
            country: '',
            currency: '',
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
                        label="Company name"
                        placeholder="Type..."
                        {...form.getInputProps('companyName')}
                    />
                    <NumberInput
                        label="Phone"
                        placeholder="Type..."
                        rightSectionWidth={70}
                        hideControls
                        {...form.getInputProps('phone')}
                    />
                    <Select
                        label="Country"
                        placeholder="Choose"
                        nothingFound="Nothing found"
                        searchable
                        data={[
                            { value: 'react', label: 'React' },
                            { value: 'ng', label: 'Angular' },
                            { value: 'svelte', label: 'Svelte' },
                            { value: 'vue', label: 'Vue' },
                        ]}
                        {...form.getInputProps('country')}
                    />

                    <Select
                        label="Currency"
                        placeholder="Choose"
                        nothingFound="لا يوجد شيء"
                        searchable
                        data={[
                            { value: 'react', label: 'React' },
                            { value: 'ng', label: 'Angular' },
                            { value: 'svelte', label: 'Svelte' },
                            { value: 'vue', label: 'Vue' },
                        ]}
                        {...form.getInputProps('currency')}
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

export default Step1;
