import { showNotification } from '@mantine/notifications';
import React, { useContext } from 'react';
import getApiError from '../../utils/getApiError';
import instance from '../../utils/axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
    Category,
    CategoryFormValues,
    Context,
    ProivderProps,
} from 'categories';

const CategoriesContext = React.createContext<Context>(null);

// Handlers
function updateHandler(category: Category) {
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
async function readHandler() {
    const response = await instance.post<Category[]>('/categories');
    return response.data;
}

const CategoriesProvider = (props: ProivderProps) => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries(['categories']);
    const mutationOptions = { onSuccess: invalidate };

    const query = useQuery('categories', readHandler);
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
        const newCat = { ...category, cat_id: category.id };
        delete newCat.id;
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

    function get(id: number): Category {
        const branch = data.find((b) => b.id === id);

        // If there is a branch with the given id, return it
        if (branch) {
            // search for null values and replace them with empty strings
            Object.keys(branch).forEach((key) => {
                if (branch[key] === null) branch[key] = '';
            });
            return branch;
        }

        // if there is no branch with the given id, return an empty branch
        // this is because the update modal is mounted in all cases needing a branch to work with
        return {
            category_name: '',
            company_id: 0,
            id: 0,
            type: '',
        };
    }
    return (
        <CategoriesContext.Provider
            value={{
                get,
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
export default CategoriesProvider;
