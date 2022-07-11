import {
    Alert,
    Button,
    createStyles,
    Group,
    NumberInput,
    Select,
    TextInput,
} from '@mantine/core';
import { StepProps } from 'signup';
import { AlertCircle } from 'tabler-icons-react';
import Selector from '../../components/Selector';
import useContries, { formatCountries } from '../../hooks/useContries';
import { step1Keys } from './Schema';
import StepShell from './StepShell';
import validateKeys from './validateKeys';
import useCurrencies from '../../hooks/useCurrencies';
const Step1 = (props: StepProps) => {
    const { form } = props;
    const { classes } = useStyles();
    const { data: countriesData, error } = useContries();
    const cc = useCurrencies();
    let countries = [];
    let loading = !countriesData;
    if (countriesData) countries = formatCountries(countriesData);

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
                        {...form.getInputProps('company_name')}
                    />
                    <NumberInput
                        label="Phone"
                        placeholder="Type..."
                        rightSectionWidth={70}
                        hideControls
                        {...form.getInputProps('company_phone')}
                    />
                    <Selector
                        autoComplete="off"
                        label="Country"
                        placeholder="Choose"
                        nothingFound="Nothing found"
                        searchable
                        loading={loading}
                        data={countries}
                        {...form.getInputProps('company_country')}
                    />
                    {error && (
                        <Alert
                            mb={16}
                            color="red"
                            title="Couldn't fetch countries"
                            icon={<AlertCircle />}
                        >
                            You won't be able to complete signup right now
                        </Alert>
                    )}

                    <Selector
                        autoComplete="off"
                        label="Currency"
                        placeholder="Choose"
                        nothingFound="Nothing found"
                        searchable
                        data={cc}
                        {...form.getInputProps('company_currency')}
                    />
                </Group>

                <Group grow mt="xl">
                    <Button disabled={error} type="submit">
                        Next
                    </Button>
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
