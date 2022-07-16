import { showNotification } from '@mantine/notifications';
import React, { useContext } from 'react';
import getApiError from '../../../utils/getApiError';
import instance from '../../../utils/axios';
import { useMutation, useQueryClient } from 'react-query';
import useGetSubCats from '../../../api/useGetSubCats';

const SubCategoriesContext = React.createContext<Context<SubCategory>>(null);

function updateHandler(data: SubCategoryUpdate) {
    return instance.post('/edit-subcategory', data);
}
function createHanlder(data: SubCategoryFormValues) {
    return instance.post('/add-subcategory', data);
}

function deleteHandler(id: number) {
    return instance.post('/delete-subcategory', {
        sub_cat_id: id,
    });
}

const SubCategoriesProvider = (props: ProivderProps) => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries(['sub-categories']);
    const mutationOptions = { onSuccess: invalidate };

    const query = useGetSubCats();
    const createOwner = useMutation(createHanlder, mutationOptions);
    const updateOwner = useMutation(updateHandler, mutationOptions);
    const deleteOwner = useMutation(deleteHandler, mutationOptions);
    const { data, isFetching } = query;

    const create = async (category: SubCategoryFormValues) => {
        try {
            await createOwner.mutateAsync(category);
            showNotification({
                title: 'Success',
                message: 'Added branch successfully',
            });
        } catch (error) {
            showNotification({
                title: 'Something went wrong!',
                message: getApiError(error.response.data),
                color: 'red',
            });
        }
    };

    const update = async (subCat: SubCategory) => {
        const newSubCat: SubCategoryUpdate = {
            sub_cat_id: subCat.id,
            category_id: subCat.category_id,
            sub_category_name: subCat.sub_category_name,
        };
        try {
            await updateOwner.mutateAsync(newSubCat);
            showNotification({
                title: 'Success',
                message: 'Updated Category successfully',
            });
        } catch (error) {
            showNotification({
                title: 'Something went wrong!',
                message: getApiError(error.response.data),
                color: 'red',
            });
        }
    };
    async function remove(id: number) {
        try {
            await deleteOwner.mutateAsync(id);
            showNotification({
                title: 'Success',
                message: 'Deleted category successfully',
            });
        } catch (error) {
            showNotification({
                title: 'Something went wrong!',
                message: getApiError(error.response.data),
                color: 'red',
            });
        }
    }

    return (
        <SubCategoriesContext.Provider
            value={{
                data,
                isCreating: createOwner.isLoading,
                isRemoving: deleteOwner.isLoading,
                isUptading: updateOwner.isLoading,
                remove,
                create,
                update,
                isFetching,
            }}
        >
            {props.children}
        </SubCategoriesContext.Provider>
    );
};

export const useSubCategories = () => useContext(SubCategoriesContext);
export default SubCategoriesProvider;
