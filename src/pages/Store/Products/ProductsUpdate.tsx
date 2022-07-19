import {
    Button,
    Group,
    Modal,
    NumberInput,
    ScrollArea,
    Select,
    Stack,
    TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { Suspense } from 'react';
import {
    CatsToSelectItems,
    useCategoriesList,
} from '../../../api/store/useCategories';
import useProducts from '../../../api/store/useProducts';
import {
    SubcatsToSelectItems,
    useSubCatsList,
} from '../../../api/store/useSubCats';
import { units } from '../../../api/useUnits';
import {
    useWarehousesList,
    WarehousesToSelectItems,
} from '../../../api/store/useWarehouses';
import FormDivider from '../../../components/FormDivider';
import Spinner from '../../../components/Spinner';
import find from '../../../utils/find';
import getApiError from '../../../utils/getApiError';
import schema from './schema';
type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};

const ProductUpdate = (props: Props) => {
    const { data: cats } = useCategoriesList();
    const { data: subcats } = useSubCatsList();
    const { data: warehouses } = useWarehousesList();
    const { update, isUpdating, data: products } = useProducts();

    const form = useForm<Product>({
        schema: yupResolver(schema),
        initialValues: find(props.selectedId, products),
    });

    async function handleSubmit(values: Product) {
        const newProduct: ProductUpdate = {
            product_id: values.id,
            ...values,
        };
        try {
            await update(newProduct);
            showNotification({
                message: 'Product updated successfully',
                title: 'Success',
            });
        } catch (error) {
            showNotification({
                message: getApiError(error),
                title: 'Error',
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
            overflow="outside"
        >
            <ScrollArea sx={{ height: 500 }}>
                <Suspense fallback={<Spinner />}>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack>
                            <TextInput
                                label="Product name"
                                placeholder="Name"
                                {...form.getInputProps('product_name')}
                            />
                            <TextInput
                                label="Product model"
                                placeholder="Model"
                                {...form.getInputProps('product_model')}
                            />
                            <TextInput
                                label="Description"
                                placeholder="Description"
                                {...form.getInputProps('description')}
                            />
                            <Select
                                label="Unit"
                                placeholder="Select Unit"
                                data={units}
                                {...form.getInputProps('product_unit')}
                            />
                            <Select
                                label="Warehouse"
                                placeholder="Select Warehouse"
                                data={WarehousesToSelectItems(warehouses)}
                                defaultValue={form.values.warehouse_id.toString()}
                                {...form.getInputProps('warehouse_id')}
                            />
                            <NumberInput
                                label="Piece price"
                                placeholder="Piece price"
                                hideControls
                                {...form.getInputProps('piece_price')}
                            />

                            <NumberInput
                                label="Total price"
                                placeholder="Total price"
                                {...form.getInputProps('total_price')}
                                hideControls
                            />

                            <NumberInput
                                label="Wholesale price"
                                placeholder="Wholesale price"
                                hideControls
                                {...form.getInputProps('wholesale_price')}
                            />
                            <NumberInput
                                label="Warehouse balance"
                                placeholder="Warehouse balance"
                                hideControls
                                {...form.getInputProps('warehouse_balance')}
                            />
                            <NumberInput
                                label="Barcode"
                                placeholder="Barcode"
                                hideControls
                                {...form.getInputProps('barcode')}
                            />
                            <Select
                                label="Category"
                                placeholder="Select category"
                                data={CatsToSelectItems(cats)}
                                defaultValue={form.values.category.toString()}
                                {...form.getInputProps('category')}
                            />
                            <Select
                                label="Sub Category"
                                placeholder="Select sub category"
                                data={SubcatsToSelectItems(
                                    Number(form.values.category),
                                    subcats
                                )}
                                defaultValue={form.values.sub_category.toString()}
                                disabled={!form.values.category}
                                {...form.getInputProps('sub_category')}
                            />
                            <NumberInput
                                label="Min Stock"
                                placeholder="Min Stock"
                                hideControls
                                {...form.getInputProps('min_stock')}
                            />

                            <FormDivider />
                            <Group>
                                <Button type="submit" loading={isUpdating}>
                                    Update
                                </Button>
                                <Button
                                    variant="light"
                                    onClick={props.requestClose}
                                >
                                    Cancel
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Suspense>
            </ScrollArea>
        </Modal>
    );
};

export default ProductUpdate;
