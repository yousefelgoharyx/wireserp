import {
    Button,
    createStyles,
    Group,
    NumberInput,
    Select,
    TextInput,
} from '@mantine/core';
import { step1Keys } from './Schema';
import StepShell from './StepShell';
import validateKeys from './validateKeys';
const Step1 = (props: StepProps) => {
    const { classes } = useStyles();
    const { form } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = form.validate();
        const isValid = validateKeys(validation.errors, step1Keys);
        if (isValid) {
            props.onNext();
            form.clearErrors();
        }
    };
    return (
        <StepShell>
            <form className={classes.form} onSubmit={handleSubmit}>
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
                        {...form.getInputProps('companyPhone')}
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
        </StepShell>
    );
};

const useStyles = createStyles({
    form: {
        width: '100%',
        maxWidth: 550,
    },
});

export default Step1;
