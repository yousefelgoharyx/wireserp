import { NumberInput, Select, SelectItem, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { yupResolver, useForm } from '@mantine/form';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { useQuery } from 'react-query';
import Selector from '../../components/Selector';
import instance from '../../utils/axios';

interface SectionItems extends SelectItem {
    value: Section;
}
const sectionItems: SectionItems[] = [
    { label: 'Clients', value: 'clients' },
    { label: 'Categories', value: 'categories' },
    { label: 'Products', value: 'products' },
];

async function fetchSections(section: Section) {
    return instance.post<any[]>(section).then((res) => res.data);
}
type InputsProps = {
    form: UseFormReturnType<CouponForm>;
};
const Inputs = ({ form }: InputsProps) => {
    let section = form.values.section;
    const { data, isLoading } = useQuery(
        ['section', section],
        () => fetchSections(section),
        { suspense: false }
    );

    let selectData = [];
    if (!isLoading) {
        if (section === 'clients') {
            selectData = data.map(
                (item): SelectItem => ({
                    label: item.c_name,
                    value: item.id.toString(),
                })
            );
        }
        if (section === 'categories') {
            selectData = data.map(
                (item): SelectItem => ({
                    label: item.category_name,
                    value: item.id.toString(),
                })
            );
        }

        if (section === 'products') {
            selectData = data.map(
                (item): SelectItem => ({
                    label: item.product_name,
                    value: item.id.toString(),
                })
            );
        }
    }

    return (
        <>
            <TextInput
                label="Card number"
                placeholder="Enter card number"
                {...form.getInputProps('code')}
            />
            <NumberInput
                label="Discount"
                placeholder="Enter discount"
                hideControls
                {...form.getInputProps('discount')}
            />
            <DatePicker
                label="Expire date"
                {...form.getInputProps('expire_date')}
            />
            <Select
                label="Section"
                placeholder="Select a section"
                data={sectionItems}
                {...form.getInputProps('section')}
                onChange={(v) => {
                    form.setFieldValue('section', v as Section);
                    form.setFieldValue('item_id', null);
                }}
                value={section}
            />
            <Selector
                loading={isLoading}
                label={section.charAt(0).toUpperCase() + section.slice(1)}
                placeholder="Select a section"
                {...form.getInputProps('item_id')}
                data={selectData}
                onChange={(v) => form.setFieldValue('item_id', +v)}
                value={form.values.item_id?.toString() ?? null}
            />
        </>
    );
};

export default Inputs;
