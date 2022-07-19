import type { SelectItem } from '@mantine/core';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
const COUNTRIES_API = 'https://erp.digitwires.com/api/countries';
interface Country {
    id: number;
    name_ar: string;
    name_en: string;
}
async function fetcher() {
    const response = await axios.get<Country[]>(COUNTRIES_API);
    return response.data;
}

const useContries = () => {
    const query = useQuery('countries', fetcher);
    const { i18n } = useTranslation();
    console.log(query);

    return {
        ...query,
        countriesSelect: query.data.map((item) => {
            return {
                value: item.name_en,
                label: item[`name_${i18n.language}`],
            };
        }),
    };
};

export default useContries;
