import { useDisclosure } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import { useRef } from 'react';
import DataGrid from '../../../components/DataGrid';
import DeleteModal from '../../../components/DeleteModal';
import EditDelete from '../../../components/EditDelete';
import CatsUpdate from './ProductsUpdate';
import { columns } from './columns';
import useProducts from '../../../api/useProducts';
import { Stack } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import getApiError from '../../../utils/getApiError';
import find from '../../../utils/find';
import { useCategoriesList } from '../../../api/useCategories';
import { useSubCatsList } from '../../../api/useSubCats';
import { useWarehousesList } from '../../../api/useWarehouses';
const ProductsTable = () => {
    const { data: cats } = useCategoriesList();
    const { data: subcats } = useSubCatsList();
    const { data: warehouses } = useWarehousesList();
    const [deleteOpened, deleteHandlers] = useDisclosure(false);
    const [editOpened, editHandler] = useDisclosure(false);
    const { data: products, remove, isRemoving } = useProducts();
    const selectedId = useRef<number | null>(null);

    const tableData: ProductTable[] = products.map((product) => ({
        ...product,
        category: find(product.category, cats)?.category_name || 'N/A',
        sub_category:
            find(product.sub_category, subcats)?.sub_category_name || 'N/A',
        warehouse:
            find(product.warehouse_id, warehouses)?.warehouse_name || 'N/A',
    }));
    const cols: ColumnDef<ProductTable>[] = [
        ...columns,
        {
            id: 'select',
            header: 'Actions',
            cell: ({ row }) => (
                <EditDelete
                    onDelete={() => {
                        deleteHandlers.open();
                        selectedId.current = row.original.id;
                    }}
                    onEdit={() => {
                        editHandler.open();
                        selectedId.current = row.original.id;
                    }}
                />
            ),
        },
    ];

    async function handleDelete() {
        try {
            await remove(selectedId.current);
            showNotification({
                message: 'Product deleted',
            });
        } catch (error) {
            showNotification({
                message: getApiError(error),
                color: 'red',
            });
        }
        deleteHandlers.close();
    }
    return (
        <Stack>
            <DeleteModal
                isOpen={deleteOpened}
                requestClose={deleteHandlers.close}
                title="Delete product"
                text="Are you sure you want to delete this product?"
                loading={isRemoving}
                onConfirm={handleDelete}
            />
            {editOpened && (
                <CatsUpdate
                    isOpen={editOpened}
                    requestClose={editHandler.close}
                    selectedId={selectedId.current}
                />
            )}
            <DataGrid data={tableData} columns={cols} />
        </Stack>
    );
};

export default ProductsTable;
