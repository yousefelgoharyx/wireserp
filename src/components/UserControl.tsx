import {
    Avatar,
    createStyles,
    Group,
    Menu,
    Text,
    UnstyledButton,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Power, Search, Settings, UserCircle } from 'tabler-icons-react';

type Props = {
    source: string;
    name: string;
    email: string;
};

const UserMenu = () => {
    const navigate = useNavigate();

    return (
        <Menu>
            <Menu.Label>App</Menu.Label>
            <Menu.Item icon={<Settings size={16} />}>Settings</Menu.Item>
            <Menu.Item
                rightSection={
                    <Text size="xs" color="dimmed">
                        Ctrl + F
                    </Text>
                }
                icon={<Search size={16} />}
            >
                Search
            </Menu.Item>
            <Menu.Label>User</Menu.Label>
            <Menu.Item icon={<UserCircle size={16} />}>Profile</Menu.Item>
            <Menu.Item
                color="red"
                onClick={() => navigate('/login')}
                icon={<Power size={16} />}
            >
                Logout
            </Menu.Item>
        </Menu>
    );
};

const UserControl = (props: Props) => {
    const { classes } = useStyles();
    return (
        <>
            <UnstyledButton className={classes.user}>
                <Group noWrap className={classes.group}>
                    <UserMenu />
                    <Avatar src={props.source} radius="xl" />
                    <div>
                        <Text size="sm" weight={500}>
                            {props.name}
                        </Text>

                        <Text color="dimmed" className={classes.email}>
                            {props.email}
                        </Text>
                    </div>
                </Group>
            </UnstyledButton>
        </>
    );
};

const useStyles = createStyles((theme) => ({
    user: {
        display: 'flex',
        width: '100%',
        padding: theme.spacing.md,
        color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        borderRadius: 0,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
        },
    },

    email: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: theme.fontSizes.xs,
    },
    group: {
        width: '100%',
    },
}));

export default UserControl;
