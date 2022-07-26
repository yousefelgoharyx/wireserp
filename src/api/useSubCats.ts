import { SelectItem } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import instance from '../utils/axios';

async function fetcher() {
    const response = await instance.post<SubCategory[]>('/sub-categories');
    return response.data;
}

function deleteCategory(id: number) {
    return instance.post('/delete-subcategory', { sub_cat_id: id });
}

function createCategory(cat: SubCategoryFormValues) {
    return instance.post('/add-subcategory', cat);
}

function updateCategory(cat: SubCategoryUpdate) {
    return instance.post('/edit-subcategory', cat);
}

const useSubCats = () => {
    const queryClient = useQueryClient();
    const query = useQuery('subcategories', fetcher);

    const options = {
        onSuccess: () => {
            queryClient.invalidateQueries('subcategories');
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

export const useSubCatsList = () => {
    return useQuery('subcategories', fetcher);
};

export function SubcatsToSelectItems(
    id: number,
    subcats: SubCategory[]
): SelectItem[] {
    return subcats
        .filter((subcat) => Number(subcat.category_id) === id)
        .map(
            (subcat): SelectItem => ({
                label: subcat.sub_category_name,
                value: subcat.id.toString(),
            })
        );
}

export default useSubCats;
