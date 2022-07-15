import {
    ActionIcon,
    Button,
    Group,
    Modal,
    Paper,
    Text,
    Title,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { BranchColumn, BranchTable } from 'branches';
import { useRef, useState } from 'react';
import { EditCircle, Trash } from 'tabler-icons-react';
import Table from '../../components/Table';
import getApiError from '../../utils/getApiError';
import useBranches from './api/useBranches';
import useDeleteBranch from './api/useDeleteBranch';
const columns: BranchColumn[] = [
    { header: 'ID', selector: 'id' },
    { header: 'Name', selector: 'branch_name' },
    { header: 'Phone', selector: 'branch_phone' },
    { header: 'Address', selector: 'branch_address' },
    {
        header: 'Registartion number',
        selector: 'commercial_registration_number',
    },
];

function getActions({ onDelete, onEdit }) {
    return [
        {
            cell: (row) => (
                <Group>
                    <ActionIcon onClick={() => onDelete(row)}>
                        <Trash size={20} />
                    </ActionIcon>
                    <ActionIcon onClick={() => onEdit(row)}>
                        <EditCircle size={20} />
                    </ActionIcon>
                </Group>
            ),
        },
    ];
}
const ReadBranches = () => {
    const [deleteModal, setDeleteModal] = useState(false);
    const selectedRow = useRef<BranchTable>();
    const { data } = useBranches();
    const deleteOwner = useDeleteBranch();

    async function handleDelete() {
        try {
            await deleteOwner.mutateAsync(selectedRow.current.id);
            showNotification({
                title: 'Success',
                message: 'Deleted branch successfully',
            });
        } catch (error) {
            showNotification({
                title: 'Something went wrong!',
                message: getApiError(error.response.data),
                color: 'red',
            });
        }
        setDeleteModal(false);
    }

    function onDelete(row) {
        setDeleteModal(true);
        selectedRow.current = row;
    }
    function onEdit(row) {
        setDeleteModal(true);
        selectedRow.current = row;
    }
    const actions = getActions({ onDelete, onEdit });
    return (
        <Paper>
            <Modal
                centered
                opened={deleteModal}
                onClose={() => setDeleteModal(false)}
                withCloseButton={false}
            >
                <Title mb={4} order={4}>
                    Confirmation
                </Title>
                <Text>Are you sure you want to delete this branch</Text>
                <Group mt={16}>
                    <Button
                        loading={deleteOwner.isLoading}
                        color="red"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="light"
                        onClick={() => setDeleteModal(false)}
                    >
                        Cancel
                    </Button>
                </Group>
            </Modal>
            <Table actions={actions} columns={columns} data={data} />
        </Paper>
    );
};

export default ReadBranches;
