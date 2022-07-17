import { ActionIcon, Group } from '@mantine/core';
import { EditCircle, Trash } from 'tabler-icons-react';

type Props = {
    onDelete: (t: any) => void;
    onEdit: (t: any) => void;
};
const EditDelete = (props: Props) => {
    return (
        <Group>
            <ActionIcon onClick={props.onDelete}>
                <Trash size={20} />
            </ActionIcon>
            <ActionIcon>
                <EditCircle size={20} onClick={props.onEdit} />
            </ActionIcon>
        </Group>
    );
};

export default EditDelete;