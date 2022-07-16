import { ActionIcon, Group, Pagination, Paper } from '@mantine/core';
import { useRef, useState } from 'react';
import { EditCircle, Trash } from 'tabler-icons-react';
import Table from '../../components/Table';
import { useSubCategories } from './SubCategoriesContext';
import { columns } from './data';
import Delete from './Delete';
import Update from './Update';

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
const Read = () => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const selectedId = useRef<number | null>(null);
    const { data } = useSubCategories();

    function onDelete(row) {
        selectedId.current = row.id;
        setDeleteModal(true);
    }
    function onEdit(row) {
        selectedId.current = row.id;
        setUpdateModal(true);
    }
    const actions = getActions({ onDelete, onEdit });

    const totalPages = Math.ceil(data.length / LIMIT);
    if (page > totalPages) setPage(totalPages);
    return (
        <>
            <Paper>
                <Delete
                    key={deleteModal.toString() + '1'}
                    selectedId={selectedId.current}
                    isOpen={deleteModal}
                    requestClose={() => setDeleteModal(false)}
                />
                <Update
                    key={updateModal.toString() + '2'}
                    selectedId={selectedId.current}
                    isOpen={updateModal}
                    requestClose={() => setUpdateModal(false)}
                />

                <Table
                    actions={actions}
                    columns={columns}
                    data={data.slice((page - 1) * LIMIT, page * LIMIT)}
                />
            </Paper>
            {data.length > 0 && (
                <Pagination page={page} onChange={setPage} total={totalPages} />
            )}
        </>
    );
};

export default Read;
