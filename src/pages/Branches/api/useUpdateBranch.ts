import axios from '../../../utils/axios';
import { Branch } from 'branches';
import { useMutation, useQueryClient } from 'react-query';

function handler(newBranch: Branch) {
    return axios.post('/edit-branch', newBranch);
}

export default function useUpdateBranch() {
    const queryClient = useQueryClient();
    const mutation = useMutation(handler, {
        onSuccess: () => {
            queryClient.invalidateQueries(['branches']);
        },
    });
    return mutation;
}
