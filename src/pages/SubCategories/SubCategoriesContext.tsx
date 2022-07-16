import { showNotification } from '@mantine/notifications';
import React, { useContext } from 'react';
import getApiError from '../../utils/getApiError';
import instance from '../../utils/axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
    Context,
    ProivderProps,
    SubCategory,
    SubCategoryFormValues,
} from 'subcategories';
import { Category } from 'categories';

const SubCategoriesContext = React.createContext<Context>(null);

// Handlers
function updateHandler(data: SubCategory) {
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
async function readHandler() {
    const response = await instance.post<SubCategory[]>('/sub-categories');
    return response.data;
}

async function readCategoriesHandler() {
    const response = await instance.post<Category[]>('/categories');
    return response.data;
}

const SubCategoriesProvider = (props: ProivderProps) => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries(['sub-categories']);
    const mutationOptions = { onSuccess: invalidate };

    const query = useQuery('sub-categories', readHandler);
    const { data: categories } = useQuery('categories', readCategoriesHandler);
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

    const update = async (category: SubCategory) => {
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

    function get(id: number): SubCategory {
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
            category: undefined,
            category_id: undefined,
            id: undefined,
            company_id: undefined,
            sub_category_name: undefined,
        };
    }
    return (
        <SubCategoriesContext.Provider
            value={{
                categories: categories,
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
        </SubCategoriesContext.Provider>
    );
};

export const useSubCategories = () => useContext(SubCategoriesContext);
export default SubCategoriesProvider;
