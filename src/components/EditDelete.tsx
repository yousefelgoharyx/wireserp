import { ActionIcon, Group } from '@mantine/core';
import { EditCircle, Trash } from 'tabler-icons-react';

type Props = {
  onDelete?: (t: any) => void;
  onEdit?: (t: any) => void;
  isDeleting?: boolean;
};
const EditDelete = (props: Props) => {
  return (
    <Group>
      {props.onDelete && (
        <ActionIcon disabled={props.isDeleting || false} onClick={props.onDelete}>
          <Trash size={20} />
        </ActionIcon>
      )}
      {props.onEdit && (
        <ActionIcon>
          <EditCircle size={20} onClick={props.onEdit} />
        </ActionIcon>
      )}
    </Group>
  );
};

export default EditDelete;
