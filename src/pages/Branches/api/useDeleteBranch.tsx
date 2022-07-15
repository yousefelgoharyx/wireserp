import axios from '../../../utils/axios';
import { useMutation, useQueryClient } from 'react-query';

function handler(id: number) {
    return axios.post('/delete-branch', {
        branch_id: id,
    });
}

export default function useDeleteBranch() {
    const queryClient = useQueryClient();
    const mutation = useMutation(handler, {
        onSuccess: () => {
            queryClient.invalidateQueries(['branches']);
        },
    });
    return mutation;
}
