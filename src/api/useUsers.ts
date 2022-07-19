import { SelectItem } from '@mantine/core';
import { useQuery } from 'react-query';
import instance from '../utils/axios';

interface User {
    id: number;
    full_name: string;
    email: string;
    phone: number;
    status: string;
    branch: string;
    role: string;
}
async function fetcher() {
    const response = await instance.get<User[]>('/permissions');
    return response.data;
}

const useUsers = () => {
    const query = useQuery('users', fetcher);

    return {
        ...query,
        selectData: query.data.map(
            (user): SelectItem => ({
                label: user.full_name,
                value: user.id.toString(),
            })
        ),
    };
};

export default useUsers;
