import type { SelectItem } from '@mantine/core';
import axios from 'axios';
import useSWR from 'swr';

const COUNTRIES_API = 'https://restcountries.com/v3.1/all?fields=name';
async function countriesFetcher(url) {
    const response = await axios.get(url);
    return response.data;
}
export const formatCountries = (data: any): SelectItem[] => {
    return data.map((item) => {
        let description = item.name.common;
        let nativeNamesKeys = Object.keys(item.name.nativeName);
        if (nativeNamesKeys.length > 0) {
            description = item.name.nativeName[nativeNamesKeys[0]].official;
        }

        return {
            value: item.name.common,
            label: item.name.common,
            description,
        };
    });
};
const useContries = () => {
    const swr = useSWR(COUNTRIES_API, countriesFetcher);

    return swr;
};

export default useContries;
