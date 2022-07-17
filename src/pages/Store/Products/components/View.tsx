import { ActionIcon, Group, Pagination, Paper } from '@mantine/core';
import { useRef, useState } from 'react';
import { EditCircle, Trash } from 'tabler-icons-react';
import Table from '../../../../components/Table';
import { useProducts } from '../Provider';
import { columns } from '../data';
import Update from './Update';
import DeleteModal from '../../../../components/DeleteModal';

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
const View = () => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const selectedId = useRef<number | null>(null);
    const { data: products, remove, isRemoving } = useProducts();
    function closeDeleteModal() {
        setDeleteModal(false);
    }

    function onDelete(row) {
        selectedId.current = row.id;
        setDeleteModal(true);
    }
    function onEdit(row) {
        selectedId.current = row.id;
        setUpdateModal(true);
    }
    const actions = getActions({ onDelete, onEdit });

    const totalPages = Math.ceil(products.length / LIMIT);
    if (page > totalPages) setPage(totalPages);

    async function handleDelete() {
        await remove(selectedId.current);
        closeDeleteModal();
    }
    return (
        <>
            <Paper>
                <DeleteModal
                    isOpen={deleteModal}
                    loading={isRemoving}
                    onConfirm={handleDelete}
                    requestClose={closeDeleteModal}
                    text="Are you sure you want to delete this product?"
                    title="Delete Product"
                />

                {updateModal && (
                    <Update
                        selectedId={selectedId.current}
                        isOpen={updateModal}
                        requestClose={() => setUpdateModal(false)}
                    />
                )}

                <Table
                    actions={actions}
                    columns={columns}
                    data={products.slice((page - 1) * LIMIT, page * LIMIT)}
                />
            </Paper>
            {products.length > 0 && (
                <Pagination page={page} onChange={setPage} total={totalPages} />
            )}
        </>
    );
};

export default View;
