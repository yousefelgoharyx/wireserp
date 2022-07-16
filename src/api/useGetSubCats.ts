import { useQuery } from 'react-query';
import instance from '../utils/axios';

async function fetcher() {
    const response = await instance.post<SubCategory[]>('/sub-categories');
    return response.data;
}

const useGetSubCats = () => {
    return useQuery('sub-categories', fetcher);
};

export default useGetSubCats;
