import { useQuery } from 'react-query';
import instance from '../utils/axios';

async function read<Response>(url: string) {
  const response = await instance.get<Response>(url);
  return response.data;
}
const useRead = <Response>(key: string[], url: string) => {
  return useQuery([...key], () => read<Response>(url));
};

export default useRead;
