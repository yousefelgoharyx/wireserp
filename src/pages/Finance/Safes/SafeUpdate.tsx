import {
    Button,
    Group,
    Modal,
    NumberInput,
    Select,
    Stack,
    TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useSafes from '../../../api/finance/useSafes';
import { useBranchesList } from '../../../api/store/useBranches';
import FormDivider from '../../../components/FormDivider';
import find from '../../../utils/find';
import Inputs from './SafesInputs';
import schema from './schema';
type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};
const SafeUpdate = (props: Props) => {
    const { data: safes, update, isUpdating } = useSafes();
    const { branchesSelect } = useBranchesList();
    const form = useForm<Safe>({
        schema: yupResolver(schema),
        initialValues: find(props.selectedId, safes),
    });

    async function handleUpdate(values: Safe) {
        try {
            await update(values);
            showNotification({
                message: 'Safe Updated Successfully',
            });
        } catch {
            showNotification({
                message: 'Error Updating safe',
            });
        }
        props.requestClose();
    }

    return (
        <Modal
            centered
            opened={props.isOpen}
            onClose={props.requestClose}
            withCloseButton={false}
        >
            <form onSubmit={form.onSubmit(handleUpdate)}>
                <Stack>
                    <Inputs form={form} />
                    {/* <TextInput
                        label="Safe name"
                        placeholder="Name"
                        {...form.getInputProps('safe_name')}
                    />
                    <Select
                        label="Branch"
                        placeholder="Select branch"
                        data={branchesSelect}
                        defaultValue={form.values.branch_id.toString()}
                        onChange={(value) =>
                            form.setFieldValue('branch_id', Number(value))
                        }
                        {...form.getInputProps('branch_id')}
                    />

                    <NumberInput
                        placeholder="Amount"
                        label="Safe balance"
                        hideControls
                        {...form.getInputProps('safe_balance')}
                    />
                    <TextInput
                        label="Safe type"
                        placeholder="type"
                        {...form.getInputProps('safe_type')}
                    /> */}
                    <FormDivider />
                    <Group>
                        <Button loading={isUpdating} type="submit">
                            Update
                        </Button>
                        <Button variant="light" onClick={props.requestClose}>
                            Cancel
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};

export default SafeUpdate;
