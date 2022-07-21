import { SelectItem } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import instance from '../../utils/axios';

async function fetcher() {
    const response = await instance.post<Branch[]>('/branches');
    return response.data;
}

const remove = (id: number) =>
    instance.post('/delete-branch', { branch_id: id });

const create = (cat: BranchFormValues) => instance.post('/add-branch', cat);
const update = (cat: BranchUpdate) => instance.post('/edit-branch', cat);

const useBranches = () => {
    const queryClient = useQueryClient();
    const query = useQuery('branches', fetcher);

    const options = {
        onSuccess: () => {
            queryClient.invalidateQueries('branches');
        },
    };
    const deleteOwner = useMutation(remove, options);
    const createOwner = useMutation(create, options);
    const updateOwner = useMutation(update, options);

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

export const useBranchesList = () => {
    const query = useQuery('branches', fetcher);
    return {
        ...query,
        branchesSelect: query.data.map(
            (branch): SelectItem => ({
                label: branch.branch_name,
                value: branch.id.toString(),
            })
        ),
    };
};

export default useBranches;
