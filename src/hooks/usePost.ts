import { useMutation, useQueryClient } from 'react-query';
import instance from '../utils/axios';
import mapRequest from '../utils/mapRequest';

async function create<Body, Response>(url: string, data: Body) {
  const response = await instance.post<Response>(url, mapRequest(data));
  return response.data;
}

const usePost = <Body, Response = any>(keys: string[], url: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: Body) => create<Body, Response>(url, data),
    {
      onSuccess: () => {
        keys.forEach((key) => {
          queryClient.invalidateQueries(key);
        });
      },
    }
  );

  return {
    post: mutation.mutateAsync,
    isPosting: mutation.isLoading,
  };
};

export default usePost;
