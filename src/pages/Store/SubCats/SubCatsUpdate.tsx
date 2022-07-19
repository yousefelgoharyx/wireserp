import { Button, Group, Modal, Select, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useCategories from '../../../api/store/useCategories';
import useSubCats from '../../../api/store/useSubCats';
import FormDivider from '../../../components/FormDivider';
import find from '../../../utils/find';
import getApiError from '../../../utils/getApiError';
import schema from './schema';
type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};
const SubCatsUpdate = (props: Props) => {
    const { update, isUpdating, data } = useSubCats();
    const { data: categories } = useCategories();
    const form = useForm<SubCategory>({
        schema: yupResolver(schema),
        initialValues: find(props.selectedId, data),
    });

    async function handleUpdate(subcat: SubCategory) {
        const subcatUpdate: SubCategoryUpdate = {
            sub_cat_id: subcat.id,
            sub_category_name: subcat.sub_category_name,
            category_id: subcat.category_id,
        };
        try {
            await update(subcatUpdate);
            showNotification({
                title: 'Success',
                message: 'Sub category updated successfully',
            });
        } catch (error) {
            showNotification({
                title: 'Success',
                message: getApiError(error.response.data),
                color: 'red',
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
        >
            <form onSubmit={form.onSubmit(handleUpdate)}>
                <Stack>
                    <TextInput
                        label="Name"
                        placeholder="Sub Category name"
                        {...form.getInputProps('sub_category_name')}
                    />
                    <Select
                        data={categories.map((cat) => ({
                            label: cat.category_name,
                            value: cat.id.toString(),
                        }))}
                        label="Category"
                        placeholder="Select category"
                        {...form.getInputProps('category_id')}
                    />
                    <FormDivider />
                    <Group>
                        <Button loading={isUpdating} type="submit">
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

export default SubCatsUpdate;
