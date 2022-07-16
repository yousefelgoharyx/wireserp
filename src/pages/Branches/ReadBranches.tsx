import { ActionIcon, Group, Paper } from '@mantine/core';
import { BranchColumn } from 'branches';
import { useRef, useState } from 'react';
import { EditCircle, Trash } from 'tabler-icons-react';
import Table from '../../components/Table';
import { useBranches } from './BranchesProvider';
import DeleteBranch from './DeleteBranch';
import UpdateBranch from './UpdateBranch';
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
    const [updateModal, setUpdateModal] = useState(false);
    const selectedId = useRef<number | null>(null);
    const { branches } = useBranches();

    function onDelete(row) {
        selectedId.current = row.id;
        setDeleteModal(true);
    }
    function onEdit(row) {
        selectedId.current = row.id;
        setUpdateModal(true);
    }
    const actions = getActions({ onDelete, onEdit });

    return (
        <Paper>
            {deleteModal && (
                <DeleteBranch
                    selectedId={selectedId.current}
                    isOpen={deleteModal}
                    requestClose={() => setDeleteModal(false)}
                />
            )}
            {updateModal && (
                <UpdateBranch
                    selectedId={selectedId.current}
                    isOpen={updateModal}
                    requestClose={() => setUpdateModal(false)}
                />
            )}

            <Table actions={actions} columns={columns} data={branches} />
        </Paper>
    );
};

export default ReadBranches;
