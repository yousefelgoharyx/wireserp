import { useQuery } from 'react-query';
import instance from '../utils/axios';

async function fetcher() {
    const response = await instance.post<Category[]>('/categories');
    return response.data;
}

const useGetCategories = () => {
    return useQuery('categories', fetcher);
};

export default useGetCategories;
