import { Button, Group, Modal, Text, Title } from '@mantine/core';

type Props = {
    isOpen: boolean;
    requestClose: () => void;
    loading: boolean;
    onConfirm: () => void;
    title: string;
    text: string;
};
const DeleteModal = (props: Props) => {
    return (
        <Modal
            centered
            opened={props.isOpen}
            onClose={props.requestClose}
            withCloseButton={false}
        >
            <Title mb={4} order={4}>
                {props.title}
            </Title>
            <Text>{props.text}</Text>
            <Group mt={16}>
                <Button
                    loading={props.loading}
                    color="red"
                    onClick={props.onConfirm}
                >
                    Delete
                </Button>
                <Button variant="light" onClick={props.requestClose}>
                    Cancel
                </Button>
            </Group>
        </Modal>
    );
};

export default DeleteModal;
