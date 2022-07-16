import { showNotification } from '@mantine/notifications';
import React, { useContext } from 'react';
import getApiError from '../../utils/getApiError';
import useReadBranches from './api/useReadBranches';
import useCreateBranch from './api/useCreateBranch';
import useDeleteBranch from './api/useDeleteBranch';
import { Branch, BranchesContextType } from 'branches';
import useUpdateBranch from './api/useUpdateBranch';

const BranchesContext = React.createContext<BranchesContextType>(null);

type Props = {
    children: React.ReactNode;
};

export const useBranches = () => useContext(BranchesContext);
const BranchesProvider = (props: Props) => {
    const { data: branches, isFetching } = useReadBranches();
    const deleteOwner = useDeleteBranch();
    const createOwner = useCreateBranch();
    const updateOwner = useUpdateBranch();

    const createBranch = async (branch: Branch) => {
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

    const updateBranch = async (branch: Branch) => {
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
    async function deleteBranch(id: number) {
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

    function getBranch(id: number): Branch {
        const branch = branches.find((b) => b.id === id);
        return branch;
    }
    return (
        <BranchesContext.Provider
            value={{
                getBranch,
                branches,
                isCreating: createOwner.isLoading,
                isDeleting: deleteOwner.isLoading,
                isUptading: updateOwner.isLoading,
                deleteBranch,
                createBranch,
                updateBranch,
                isFetching,
            }}
        >
            {props.children}
        </BranchesContext.Provider>
    );
};

export default BranchesProvider;
