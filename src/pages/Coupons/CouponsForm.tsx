import {
    Button,
    NumberInput,
    Select,
    SelectItem,
    Stack,
    TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { yupResolver, useForm } from '@mantine/form';
import { useState } from 'react';
import { useQuery } from 'react-query';
import FormDivider from '../../components/FormDivider';
import FormGrid from '../../components/FormGrid';
import FormShell from '../../components/FormShell';
import Selector from '../../components/Selector';
import instance from '../../utils/axios';
import { CouponAddSchema } from './model/schema';

interface SectionItems extends SelectItem {
    value: Section;
}
const sectionItems: SectionItems[] = [
    { label: 'Clients', value: 'clients' },
    { label: 'Categories', value: 'categories' },
    { label: 'Products', value: 'products' },
];

async function fetch(section: Section) {
    return instance.post<any[]>(section).then((res) => res.data);
}
const CouponsForm = () => {
    const [section, setSection] = useState<Section>('clients');
    const { data, isLoading } = useQuery(
        ['section', section],
        () => fetch(section),
        { suspense: false }
    );
    const form = useForm<CouponForm>({
        schema: yupResolver(CouponAddSchema),
        initialValues: {
            code: '',
            discount: undefined,
            expire_date: new Date(),
            section: section,
            id: null,
        },
    });

    function handleSubmit() {
        console.log(form.values);
    }

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
    console.log(form.values.id?.toString());

    return (
        <FormShell title="Add coupon">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <FormGrid>
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
                            onChange={(v) => setSection(v as Section)}
                            value={section}
                        />
                        <Selector
                            loading={isLoading}
                            label={
                                section.charAt(0).toUpperCase() +
                                section.slice(1)
                            }
                            placeholder="Select a section"
                            {...form.getInputProps('id')}
                            data={selectData}
                            onChange={(v) => form.setFieldValue('id', +v)}
                            value={form.values.id?.toString() ?? null}
                        />
                    </FormGrid>
                    <FormDivider />
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
        </FormShell>
    );
};

export default CouponsForm;
