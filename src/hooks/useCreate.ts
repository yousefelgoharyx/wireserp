import { useMutation, useQueryClient } from 'react-query';
import instance from '../utils/axios';

const useCreate = (url: string, queries: string[]) => {
    function create<D, R>(data: D) {
        return instance.post<R>(url, data);
    }
    const queryClient = useQueryClient();
    const mutation = useMutation(create, {
        onSuccess: () => {
            queryClient.invalidateQueries(queries);
        },
    });
    return mutation;
};

export default useCreate;
