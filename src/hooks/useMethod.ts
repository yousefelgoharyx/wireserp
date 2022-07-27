import { useMutation, useQueryClient } from 'react-query';
import instance from '../utils/axios';
import mapRequest from '../utils/mapRequest';

async function methodFn<Body, Response>(
  url: string,
  data: Body,
  method: 'put' | 'post'
) {
  const response = await instance[method]<Response>(url, mapRequest(data));
  return response.data;
}

const useMethod = <Body, Response = any>(
  keys: string[],
  url: string,
  method: 'put' | 'post'
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: Body) => methodFn<Body, Response>(url, data, method),
    {
      onSuccess: () => {
        keys.forEach((key) => {
          queryClient.invalidateQueries(key);
        });
      },
    }
  );

  return {
    mutate: mutation.mutateAsync,
    isMutating: mutation.isLoading,
  };
};

export default useMethod;
