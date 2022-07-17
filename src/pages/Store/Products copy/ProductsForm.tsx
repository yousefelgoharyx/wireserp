import { Button, Group, Select, Stack, TextInput } from '@mantine/core';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';

const ProductsForm = () => {
    return (
        <FormShell title="Add Sub category">
            <form>
                <Stack>
                    <FormGrid>|S</FormGrid>
                    <FormDivider />
                    <Group>
                        <Button type="submit">Add</Button>
                    </Group>
                </Stack>
            </form>
        </FormShell>
    );
};

export default ProductsForm;
