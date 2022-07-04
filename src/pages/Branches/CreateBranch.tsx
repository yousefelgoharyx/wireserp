import {
    Button,
    Divider,
    Group,
    Stack,
    TextInput,
    useMantineTheme,
} from '@mantine/core';
import FormDivider from '../../components/FormDivider';
import FormGroup from '../../components/FormGroup';
import FormShell from '../../components/FormShell';

type Props = {};

const CreateBranch = (props: Props) => {
    const theme = useMantineTheme();
    return (
        <div>
            <FormShell title="اضافة منتج">
                <Stack>
                    <FormGroup>
                        <TextInput label="اسم الفرع" />
                        <TextInput label="رقم هاتف الفرع" />
                    </FormGroup>
                    <FormGroup>
                        <TextInput label="عنوان الفرع" />
                        <TextInput label="السجل التجاري" />
                    </FormGroup>
                    <FormDivider />
                    <Group>
                        <Button>اضافة</Button>
                    </Group>
                </Stack>
            </FormShell>
        </div>
    );
};

export default CreateBranch;