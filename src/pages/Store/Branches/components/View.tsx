import { ActionIcon, Group, Pagination, Paper } from '@mantine/core';
import { useRef, useState } from 'react';
import { EditCircle, Trash } from 'tabler-icons-react';
import DeleteModal from '../../../../components/DeleteModal';
import Table from '../../../../components/Table';
import { useBranches } from '../Provider';
import { columns } from '../data';
import UpdateBranch from './Update';

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

const LIMIT = 5;
const ReadBranches = () => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const { data: branches, remove, isRemoving } = useBranches();
    const selectedId = useRef<number | null>(branches[0].id);

    async function handleRemove() {
        await remove(selectedId.current);
        setDeleteModal(false);
    }
    const onDelete = (row) => {
        selectedId.current = row.id;
        setDeleteModal(true);
    };
    const onEdit = (row) => {
        selectedId.current = row.id;
        setUpdateModal(true);
    };
    const actions = getActions({ onDelete, onEdit });

    const totalPages = Math.ceil(branches.length / LIMIT);
    if (page > totalPages) setPage(totalPages);
    return (
        <>
            <Paper>
                <DeleteModal
                    isOpen={deleteModal}
                    requestClose={() => setDeleteModal(false)}
                    loading={isRemoving}
                    onConfirm={handleRemove}
                    title="Confirmation"
                    text="Are you sure you want to delete this branch"
                />
                {updateModal && (
                    <UpdateBranch
                        selectedId={selectedId.current}
                        isOpen={updateModal}
                        requestClose={() => setUpdateModal(false)}
                    />
                )}

                <Table
                    actions={actions}
                    columns={columns}
                    data={branches.slice((page - 1) * LIMIT, page * LIMIT)}
                />
            </Paper>
            {branches.length > 0 && (
                <Pagination page={page} onChange={setPage} total={totalPages} />
            )}
        </>
    );
};

export default ReadBranches;
