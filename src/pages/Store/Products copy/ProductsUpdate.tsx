import { Button, Group, Modal, Stack } from '@mantine/core';
import FormDivider from '../../../components/FormDivider';
type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};
const SubCatsUpdate = (props: Props) => {
    return (
        <Modal
            centered
            opened={props.isOpen}
            onClose={props.requestClose}
            withCloseButton={false}
        >
            <form>
                <Stack>
                    <FormDivider />
                    <Group>
                        <Button type="submit">Update</Button>
                        <Button variant="light" onClick={props.requestClose}>
                            Cancel
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};

export default SubCatsUpdate;
