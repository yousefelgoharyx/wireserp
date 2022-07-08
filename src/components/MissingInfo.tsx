import { Group, Text, ThemeIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Edit } from 'tabler-icons-react';

type Props = {
    text: string;
    link: string;
};

const MissingInfo = (props: Props) => {
    return (
        <Group spacing={4}>
            <ThemeIcon size={16} variant="filled">
                <Edit size={12} />
            </ThemeIcon>
            <Text variant="link" component={Link} to={props.link}>
                {props.text}
            </Text>
        </Group>
    );
};

export default MissingInfo;
