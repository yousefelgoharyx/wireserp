import { useMutation, useQuery, useQueryClient } from 'react-query';
import instance from '../utils/axios';

async function fetcher() {
    const response = await instance.post<Branch[]>('/branches');
    return response.data;
}

function deleteCategory(id: number) {
    return instance.post('/delete-branch', { cat_id: id });
}

function createCategory(cat: BranchFormValues) {
    return instance.post('/add-branch', cat);
}

function updateCategory(cat: BranchUpdate) {
    return instance.post('/edit-branch', cat);
}

const useBranches = () => {
    const queryClient = useQueryClient();
    const query = useQuery('branches', fetcher);

    const options = {
        onSuccess: () => {
            queryClient.invalidateQueries('branches');
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

export default useBranches;
