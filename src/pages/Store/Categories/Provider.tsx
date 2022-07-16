import { showNotification } from '@mantine/notifications';
import React, { useContext } from 'react';
import getApiError from '../../../utils/getApiError';
import instance from '../../../utils/axios';
import { useMutation, useQueryClient } from 'react-query';
import useGetCategories from '../../../api/useGetCategories';

const CategoriesContext = React.createContext<Context<Category>>(null);

// Handlers
function updateHandler(category: CategoryUpdate) {
    return instance.post('/edit-category', category);
}
function createHanlder(category: CategoryFormValues) {
    return instance.post('/add-category', category);
}

function deleteHandler(id: number) {
    return instance.post('/delete-category', {
        cat_id: id,
    });
}

const Provider = (props: ProivderProps) => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries(['categories']);
    const mutationOptions = { onSuccess: invalidate };

    const query = useGetCategories();
    const createOwner = useMutation(createHanlder, mutationOptions);
    const updateOwner = useMutation(updateHandler, mutationOptions);
    const deleteOwner = useMutation(deleteHandler, mutationOptions);
    const { data, isFetching } = query;

    const create = async (category: CategoryFormValues) => {
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

    const update = async (category: Category) => {
        const newCat: CategoryUpdate = {
            cat_id: category.id,
            category_name: category.category_name,
            type: category.type,
        };
        try {
            await updateOwner.mutateAsync(newCat);
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
        <CategoriesContext.Provider
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
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => useContext(CategoriesContext);
export default Provider;
