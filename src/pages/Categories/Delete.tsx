import { Button, Group, Modal, Text, Title } from '@mantine/core';
import { useCategories } from './CategoriesContext';

type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};
const Delete = (props: Props) => {
    const { remove, isRemoving } = useCategories();

    async function handleDelete() {
        await remove(props.selectedId);
        props.requestClose();
    }

    return (
        <Modal
            centered
            opened={props.isOpen}
            onClose={props.requestClose}
            withCloseButton={false}
        >
            <Title mb={4} order={4}>
                Confirmation
            </Title>
            <Text>Are you sure you want to delete this branch</Text>
            <Group mt={16}>
                <Button loading={isRemoving} color="red" onClick={handleDelete}>
                    Delete
                </Button>
                <Button variant="light" onClick={props.requestClose}>
                    Cancel
                </Button>
            </Group>
        </Modal>
    );
};

export default Delete;
