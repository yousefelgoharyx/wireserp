import axios from '../../../utils/axios';
import { Branch } from 'branches';
import { useMutation, useQueryClient } from 'react-query';

function handler(newBranch: Branch) {
    return axios.post('/add-branch', newBranch);
}

export default function useCreateBranch() {
    const queryClient = useQueryClient();
    const mutation = useMutation(handler, {
        onSuccess: () => {
            queryClient.invalidateQueries(['branches']);
        },
    });
    return mutation;
}
