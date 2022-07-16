import { ActionIcon, Group, Pagination, Paper } from '@mantine/core';
import { useRef, useState } from 'react';
import { EditCircle, Trash } from 'tabler-icons-react';
import Table from '../../components/Table';
import { useBranches } from './BranchesProvider';
import { columns } from './data';
import DeleteBranch from './DeleteBranch';
import UpdateBranch from './UpdateBranch';

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

    const totalPages = Math.ceil(branches.length / LIMIT);
    if (page > totalPages) setPage(totalPages);
    return (
        <>
            <Paper>
                <DeleteBranch
                    key={deleteModal.toString() + '1'}
                    selectedId={selectedId.current}
                    isOpen={deleteModal}
                    requestClose={() => setDeleteModal(false)}
                />
                <UpdateBranch
                    key={updateModal.toString() + '2'}
                    selectedId={selectedId.current}
                    isOpen={updateModal}
                    requestClose={() => setUpdateModal(false)}
                />

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
