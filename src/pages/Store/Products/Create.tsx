import {
    Button,
    Group,
    Input,
    InputWrapper,
    NumberInput,
    SimpleGrid,
    Stack,
    TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import FormDivider from '../../../components/FormDivider';
import FormShell from '../../../components/FormShell';
import { useProducts } from './ProductsProvider';
import { ProductFormValues, Unit } from 'products';
import productSchema from './schemas/schema';
import { useQuery } from 'react-query';
import instance from '../../../utils/axios';
import Selector from '../../../components/Selector';

const units: { label: string; value: Unit }[] = [
    { label: 'Unit', value: 'unit' },
    { label: 'Kilogram', value: 'kg' },
    { label: 'Gram', value: 'gm' },
    { label: 'Ton', value: 'ton' },
];

async function readWarehouses() {
    const response = await instance.post<Warehouse[]>('/warehouses');
    return response.data;
}

const Create = () => {
    const { create, isCreating } = useProducts();
    const { data: warehouses } = useQuery('warehouses', readWarehouses);
    const form = useForm<ProductFormValues>({
        schema: yupResolver(productSchema),
        initialValues: {
            warehouse_id: undefined,
            warehouse_balance: undefined,
            barcode: undefined,
            category: undefined,
            description: '',
            image: undefined,
            min_stock: undefined,
            piece_price: undefined,
            product_model: '',
            product_name: '',
            product_unit: undefined,
            sub_category: undefined,
            total_price: undefined,
            wholesale_price: undefined,
        },
    });
    const warehouseSelect = warehouses.map((warehouse) => ({
        label: warehouse.warehouse_name,
        value: warehouse.id.toString(),
    }));

    console.log(form);

    return (
        <FormShell title="Add Product">
            <form onSubmit={form.onSubmit(create)}>
                <Stack>
                    <SimpleGrid
                        cols={2}
                        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                    >
                        <TextInput
                            placeholder="Type..."
                            label="Name"
                            {...form.getInputProps('product_name')}
                        />
                        <TextInput
                            placeholder="Type..."
                            label="Model"
                            {...form.getInputProps('product_model')}
                        />
                        <Selector
                            placeholder="Select Warehouse"
                            data={warehouseSelect}
                            label="Select Warehouse"
                            {...form.getInputProps('warehouse_id')}
                        />
                        <NumberInput
                            label="Warehouse balance"
                            hideControls
                            placeholder="Warehouse balance"
                            {...form.getInputProps('warehouse_balance')}
                        />
                        <NumberInput
                            label="Barcode"
                            placeholder="Barcode"
                            hideControls
                            {...form.getInputProps('barcode')}
                        />
                        <TextInput
                            placeholder="Type..."
                            label="Description"
                            {...form.getInputProps('description')}
                        />
                        <InputWrapper
                            label="Image"
                            {...form.getInputProps('image')}
                        >
                            <Input
                                type="file"
                                {...form.getInputProps('image')}
                            />
                        </InputWrapper>

                        <NumberInput
                            label="Min Stock"
                            hideControls
                            placeholder="Min Stock"
                            {...form.getInputProps('min_stock')}
                        />
                        <NumberInput
                            label="Piece Price"
                            hideControls
                            placeholder="Piece Price"
                            {...form.getInputProps('piece_price')}
                        />

                        <Selector
                            data={units}
                            placeholder="Select unit"
                            label="Unit"
                            {...form.getInputProps('product_unit')}
                        />

                        <NumberInput
                            label="Total price"
                            placeholder="Total Price"
                            hideControls
                            {...form.getInputProps('total_price')}
                        />
                        <NumberInput
                            label="Wholesale price"
                            placeholder="Wholesale Price"
                            hideControls
                            {...form.getInputProps('wholesale_price')}
                        />
                    </SimpleGrid>

                    <FormDivider />
                    <Group>
                        <Button loading={isCreating} type="submit">
                            Add
                        </Button>
                    </Group>
                </Stack>
            </form>
        </FormShell>
    );
};

export default Create;
