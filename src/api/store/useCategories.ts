import { SelectItem } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import instance from '../../utils/axios';

async function fetcher() {
    const response = await instance.post<Category[]>('/categories');
    return response.data;
}

function deleteCategory(id: number) {
    return instance.post('/delete-category', { cat_id: id });
}

function createCategory(cat: CategoryFormValues) {
    return instance.post('/add-category', cat);
}

function updateCategory(cat: CategoryUpdate) {
    return instance.post('/edit-category', cat);
}

const useCategories = () => {
    const queryClient = useQueryClient();
    const query = useQuery('categories', fetcher);

    const options = {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
        },
    };
    const deleteOwner = useMutation(deleteCategory, options);
    const createOwner = useMutation(createCategory, options);
    const updateOwner = useMutation(updateCategory, options);

    return {
        ...query,
        remove: deleteOwner.mutateAsync,
        isRemoving: deleteOwner.isLoading,
        create: createOwner.mutateAsync,
        isCreating: createOwner.isLoading,
        update: updateOwner.mutateAsync,
        isUpdating: updateOwner.isLoading,
    };
};

export const useCategoriesList = () => {
    return useQuery('categories', fetcher);
};

export function CatsToSelectItems(cats: Category[]): SelectItem[] {
    return cats.map(
        (cat): SelectItem => ({
            label: cat.category_name,
            value: cat.id.toString(),
        })
    );
}

export default useCategories;
