import { showNotification } from '@mantine/notifications';
import React, { useContext } from 'react';
import getApiError from '../../../utils/getApiError';
import instance from '../../../utils/axios';
import { useMutation, useQueryClient } from 'react-query';
import useGetBranches from '../../../api/useGetBranches';

const BranchesContext = React.createContext<Context<Branch>>(null);

function updateHandler(newBranch: BranchUpdate) {
    return instance.post('/edit-branch', newBranch);
}
function createHanlder(newBranch: BranchFormValues) {
    return instance.post('/add-branch', newBranch);
}

function deleteHandler(id: number) {
    return instance.post('/delete-branch', {
        branch_id: id,
    });
}

const Provider = (props: ProivderProps) => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries(['branches']);
    const mutationOptions = { onSuccess: invalidate };

    const query = useGetBranches();
    const createOwner = useMutation(createHanlder, mutationOptions);
    const updateOwner = useMutation(updateHandler, mutationOptions);
    const deleteOwner = useMutation(deleteHandler, mutationOptions);
    const { data: branches, isFetching } = query;

    const create = async (branch: Branch) => {
        try {
            await createOwner.mutateAsync(branch);
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

    const update = async (branch: Branch) => {
        const copyBranch = { ...branch };
        delete copyBranch.id;

        const updatedBranch: BranchUpdate = {
            ...copyBranch,
            branch_id: copyBranch.id,
        };
        try {
            await updateOwner.mutateAsync(updatedBranch);
            showNotification({
                title: 'Success',
                message: 'Updated branch successfully',
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
                message: 'Deleted branch successfully',
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
        <BranchesContext.Provider
            value={{
                data: branches,
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
        </BranchesContext.Provider>
    );
};

export const useBranches = () => useContext(BranchesContext);
export default Provider;
