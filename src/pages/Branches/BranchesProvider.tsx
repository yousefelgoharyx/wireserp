import { showNotification } from '@mantine/notifications';
import React, { useContext } from 'react';
import getApiError from '../../utils/getApiError';
import { Branch, Context, ProivderProps, BranchFormValues } from 'branches';
import instance from '../../utils/axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const BranchesContext = React.createContext<Context>(null);

// Handlers
function updateHandler(newBranch: Branch) {
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
async function readHandler() {
    const response = await instance.post<Branch[]>('/branches');
    return response.data;
}

const BranchesProvider = (props: ProivderProps) => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries(['branches']);
    const mutationOptions = { onSuccess: invalidate };

    const query = useQuery('branches', readHandler);
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
        const newBranch = { ...branch, branch_id: branch.id };
        delete newBranch.id;
        try {
            await updateOwner.mutateAsync(newBranch);
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

    function get(id: number): Branch {
        const branch = branches.find((b) => b.id === id);

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
            id: 0,
            branch_address: '',
            branch_name: '',
            branch_phone: '',
            commercial_registration_number: '',
            company_id: 0,
        };
    }
    return (
        <BranchesContext.Provider
            value={{
                get,
                branches,
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
export default BranchesProvider;
