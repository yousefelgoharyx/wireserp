import {
    Avatar,
    createStyles,
    Group,
    Text,
    UnstyledButton,
} from '@mantine/core';

type Props = {
    source: string;
    name: string;
    email: string;
    onClick: () => void;
};

const UserControl = (props: Props) => {
    const { classes } = useStyles();
    return (
        <UnstyledButton onClick={props.onClick} className={classes.user}>
            <Group noWrap>
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
}));

export default UserControl;
