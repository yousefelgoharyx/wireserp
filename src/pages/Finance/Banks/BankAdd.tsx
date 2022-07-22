import { Button, NumberInput, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import useCreate from '../../../hooks/useCreate';
import { BankAddSchema } from './model/schema';

const BankAdd = () => {
    const { create, isCreating } = useCreate<BankForm>(['banks'], '/banks');
    const form = useForm<BankForm>({
        schema: yupResolver(BankAddSchema),
        initialValues: {
            bank_name: '',
            bank_balance: undefined,
        },
    });

    async function handleSubmit() {
        try {
            await create(form.values);
            showNotification({
                message: 'Bank created successfully',
            });
        } catch (error) {
            showNotification({
                message: error.message,
                color: 'red',
            });
        }
    }
    return (
        <FormShell title="Add Bank">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <FormGrid>
                        <TextInput
                            label="Name"
                            placeholder="Enter name"
                            {...form.getInputProps('bank_name')}
                        />
                        <NumberInput
                            label="Balance"
                            placeholder="Enter balance"
                            hideControls
                            {...form.getInputProps('bank_balance')}
                        />
                    </FormGrid>
                    <FormDivider />
                    <Button loading={isCreating} type="submit">
                        Add
                    </Button>
                </Stack>
            </form>
        </FormShell>
    );
};

export default BankAdd;
