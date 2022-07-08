import {
    Card,
    createStyles,
    Group,
    Stack,
    Text,
    ThemeIcon,
    Tooltip,
} from '@mantine/core';
import { Icon } from 'tabler-icons-react';

type Props = {
    title: string;
    icon: Icon;
    children: React.ReactNode;
};

type ItemProps = {
    title: string;
    value: string;
};

const Stat = (props: Props) => {
    const { classes } = useStyles();
    return (
        <Card shadow="sm">
            <Card.Section>
                <Group spacing={8} className={classes.header}>
                    <ThemeIcon variant="light">
                        <props.icon size={20} />
                    </ThemeIcon>
                    <Tooltip label={props.title} sx={{ overflow: 'hidden' }}>
                        <Text className={classes.title}>{props.title}</Text>
                    </Tooltip>
                </Group>
            </Card.Section>
            <Stack align="center" spacing={4}>
                {props.children}
            </Stack>
        </Card>
    );
};

export const StatItem = (props: ItemProps) => {
    return (
        <Group spacing={4}>
            <Text>{props.title}</Text>
            <Text weight={700}>{props.value}</Text>
        </Group>
    );
};

const useStyles = createStyles((theme) => ({
    header: {
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[3]
                : theme.colors.gray[3]
        }`,
        padding: 16,
        marginBottom: 16,
        flexWrap: 'nowrap',
    },
    title: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
    },
}));
export default Stat;
