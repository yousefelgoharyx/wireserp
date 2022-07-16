import { Branch } from 'branches';
import { useQuery } from 'react-query';
import instance from '../../../utils/axios';

async function fetcher() {
    const response = await instance.post('/branches');
    return response.data;
}
const useReadBranches = () => {
    return useQuery<Branch[]>('branches', fetcher);
};

export default useReadBranches;
