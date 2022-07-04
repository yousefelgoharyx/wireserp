import { useState } from 'react';
import {
    Group,
    Box,
    Collapse,
    ThemeIcon,
    UnstyledButton,
    createStyles,
} from '@mantine/core';
import {
    Icon as TablerIcon,
    ChevronLeft,
    ChevronRight,
    UserCircle,
} from 'tabler-icons-react';
import { NavLink, useNavigate } from 'react-router-dom';

type SidebarDropdownProps = {
    level: number;
    icon: TablerIcon;
    label: string;
    link?: string;
    children: React.ReactNode;
};
const SidebarDropdown = (props: SidebarDropdownProps) => {
    const { level, icon: Icon, label } = props;
    const [opened, setOpened] = useState(false);
    const { classes, theme } = useStyles();
    const icon = useIconStyles(opened);
    const navigate = useNavigate();
    const ChevronIcon = theme.dir === 'ltr' ? ChevronRight : ChevronLeft;
    const handleClick = () => {
        setOpened(!opened);
        if (props.link) navigate(props.link);
    };

    return (
        <>
            <UnstyledButton onClick={handleClick} className={classes.control}>
                <Group position="apart" spacing={0}>
                    <Box className={classes.controlInfo}>
                        <ThemeIcon
                            variant={level > 1 ? 'light' : 'filled'}
                            size={32}
                        >
                            <Icon size={24} />
                        </ThemeIcon>

                        <Box ml="md">{label}</Box>
                    </Box>

                    <ChevronIcon className={icon.classes.chevron} size={14} />
                </Group>
            </UnstyledButton>
            <Collapse className={classes.collapse} in={opened}>
                {props.children}
            </Collapse>
        </>
    );
};

export const SidebarLinks = (props) => {
    const { classes } = useStyles();
    return (
        <>
            <SidebarDropdown
                level={1}
                label="Products"
                icon={UserCircle}
                link="/"
            >
                <SidebarDropdown
                    level={2}
                    label="Branches"
                    icon={UserCircle}
                    link="branches"
                >
                    <NavLink className={classes.link} to="branches/create">
                        Cretae
                    </NavLink>
                </SidebarDropdown>
            </SidebarDropdown>
        </>
    );
};

const useIconStyles = createStyles((theme, opened: boolean) => ({
    chevron: {
        transition: 'transform 200ms ease',
        transform: opened
            ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
            : 'none',
    },
}));

const useStyles = createStyles((theme) => ({
    control: {
        fontWeight: 500,
        display: 'block',
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },
    collapse: {
        borderLeft: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
        marginLeft: 32,
    },
    controlInfo: {
        display: 'flex',
        alignItems: 'center',
    },

    link: {
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

        paddingLeft: 16,
        fontSize: theme.fontSizes.sm,
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7],

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },
}));
