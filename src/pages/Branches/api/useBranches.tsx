import { BranchTable } from 'branches';
import { useQuery } from 'react-query';
import instance from '../../../utils/axios';

async function fetcher() {
    const response = await instance.post('/branches');
    return response.data;
}
const useBranches = () => {
    return useQuery<BranchTable[]>('branches', fetcher);
};

export default useBranches;
