import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { Branch } from 'branches';
import FormDivider from '../../components/FormDivider';
import { useBranches } from './BranchesProvider';
import branchSchema from './schemas/schema';
type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};
const UpdateBranch = (props: Props) => {
    const { getBranch, updateBranch, isUptading } = useBranches();

    const form = useForm<Branch>({
        schema: yupResolver(branchSchema),
        initialValues: getBranch(props.selectedId),
    });

    async function handleUpdate(branch: Branch) {
        await updateBranch(branch);
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
                    <TextInput
                        required
                        label="Name"
                        {...form.getInputProps('branch_name')}
                    />
                    <TextInput
                        required
                        label="Phone"
                        {...form.getInputProps('branch_phone')}
                    />
                    <TextInput
                        required
                        label="Address"
                        {...form.getInputProps('branch_address')}
                    />
                    <TextInput
                        label="Registration Number"
                        {...form.getInputProps(
                            'commercial_registration_number'
                        )}
                    />
                    <FormDivider />
                    <Group>
                        <Button loading={isUptading} type="submit">
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

export default UpdateBranch;
