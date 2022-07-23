import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import instance from '../utils/axios';

async function updateFn<Body, Response>(url: string, data: Body) {
    const response = await instance.put<Response>(url, data);
    return response.data;
}

const useUpdate = <Body, Response = AxiosResponse<any>>(
    keys: string[],
    url: string
) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (data: Body) => updateFn<Body, Response>(url, data),
        {
            onSuccess: () => {
                keys.forEach((key) => {
                    queryClient.invalidateQueries(key);
                });
            },
        }
    );

    return {
        update: mutation.mutateAsync,
        isUpdating: mutation.isLoading,
    };
};

export default useUpdate;
