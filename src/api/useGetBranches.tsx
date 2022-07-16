import { useQuery } from 'react-query';
import instance from '../utils/axios';
async function fetcher() {
    const response = await instance.post<Branch[]>('/branches');
    return response.data;
}
const useGetBranches = () => {
    return useQuery('branches', fetcher);
};

export default useGetBranches;
