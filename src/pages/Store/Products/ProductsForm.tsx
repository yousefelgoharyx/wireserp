import {
    Button,
    Group,
    Input,
    InputWrapper,
    NumberInput,
    Select,
    Stack,
    TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
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
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import getApiError from '../../../utils/getApiError';
import schema from './schema';

function getFormData(object) {
    const formData = new FormData();

    Object.keys(object).forEach((key) => {
        if (object[key]) formData.append(key, object[key]);
    });
    return formData;
}
const ProductsForm = () => {
    const { data: cats } = useCategoriesList();
    const { data: subcats } = useSubCatsList();
    const { data: warehouses } = useWarehousesList();
    const { create, isCreating } = useProducts();
    const form = useForm<ProductFormValues>({
        schema: yupResolver(schema),
        initialValues: {
            barcode: undefined,
            category: null,
            description: '',
            image: null,
            min_stock: undefined,
            piece_price: undefined,
            product_model: '',
            product_name: '',
            product_unit: null,
            sub_category: null,
            total_price: undefined,
            wholesale_price: undefined,
            warehouse_balance: undefined,
            warehouse_id: null,
        },
    });

    async function handleSubmit(values: ProductFormValues) {
        try {
            await create(getFormData(values));
            showNotification({
                title: 'Product created',
                message: 'Product created',
            });
            form.reset();
        } catch (error) {
            showNotification({
                title: 'Error',
                message: getApiError(error.response.data),
            });
        }
    }

    return (
        <FormShell title="Add Product">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <FormGrid>
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
                            {...form.getInputProps('warehouse_id')}
                        />
                        <NumberInput
                            label="Piece price"
                            placeholder="Piece price"
                            {...form.getInputProps('piece_price')}
                            hideControls
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
                            {...form.getInputProps('category')}
                        />
                        <Select
                            disabled={!form.values.category}
                            label="Sub Category"
                            placeholder="Select sub category"
                            data={SubcatsToSelectItems(
                                Number(form.values.category),
                                subcats
                            )}
                            {...form.getInputProps('sub_category')}
                        />
                        <NumberInput
                            label="Min Stock"
                            placeholder="Min Stock"
                            hideControls
                            {...form.getInputProps('min_stock')}
                        />
                        <InputWrapper label="Image">
                            <Input
                                type="file"
                                onChange={(e) =>
                                    form.setFieldValue(
                                        'image',
                                        e.target.files[0]
                                    )
                                }
                            />
                        </InputWrapper>
                    </FormGrid>
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

export default ProductsForm;
