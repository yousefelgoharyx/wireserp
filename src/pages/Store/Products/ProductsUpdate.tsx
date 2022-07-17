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
import { FORMERR } from 'dns';
import { useCategoriesList } from '../../../api/useCategories';
import useProducts from '../../../api/useProducts';
import { useSubCatsList } from '../../../api/useSubCats';
import { useWarehousesList } from '../../../api/useWarehouses';
import FormDivider from '../../../components/FormDivider';
import find from '../../../utils/find';
import getApiError from '../../../utils/getApiError';
import schema from './schema';
type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};
type Units = {
    name: string;
    value: Unit;
}[];
const units: Units = [
    {
        name: 'Unit',
        value: 'unit',
    },
    {
        name: 'Kilogram',
        value: 'kg',
    },
    {
        name: 'Gram',
        value: 'gm',
    },
    {
        name: 'Ton',
        value: 'ton',
    },
];
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
    }
    return (
        <Modal
            centered
            opened={props.isOpen}
            onClose={props.requestClose}
            withCloseButton={false}
        >
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
                        data={units.map((unit) => ({
                            label: unit.name,
                            value: unit.value,
                        }))}
                        {...form.getInputProps('product_unit')}
                    />
                    <Select
                        label="Warehouse"
                        placeholder="Select Warehouse"
                        data={warehouses.map((warehouse) => ({
                            label: warehouse.warehouse_name,
                            value: warehouse.id.toString(),
                        }))}
                        defaultValue={warehouses
                            .find(
                                (warehouse) =>
                                    warehouse.id === form.values.warehouse_id
                            )
                            .id.toString()}
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
                        data={cats.map((cat) => ({
                            label: cat.category_name,
                            value: cat.id.toString(),
                        }))}
                        defaultValue={cats
                            .find((cat) => cat.id === form.values.category)
                            .id.toString()}
                        {...form.getInputProps('category')}
                    />
                    <Select
                        label="Sub Category"
                        placeholder="Select sub category"
                        data={subcats.map((subcat) => ({
                            label: subcat.sub_category_name,
                            value: subcat.id.toString(),
                        }))}
                        defaultValue={subcats
                            .find(
                                (subcat) =>
                                    subcat.id === form.values.sub_category
                            )
                            .id.toString()}
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
                        <Button variant="light" onClick={props.requestClose}>
                            Cancel
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};

export default ProductUpdate;
