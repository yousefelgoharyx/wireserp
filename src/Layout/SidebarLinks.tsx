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
} from 'tabler-icons-react';
import { Link, NavLink } from 'react-router-dom';

type SidebarDropdownProps = {
    level: number;
    icon: TablerIcon;
    label: string;
    items: any;
};
const SidebarDropdown = (props: SidebarDropdownProps) => {
    const { level, icon: Icon, label, items } = props;
    const [opened, setOpened] = useState(false);
    const { classes, theme } = useStyles({ opened: opened, level });
    const ChevronIcon = theme.dir === 'ltr' ? ChevronRight : ChevronLeft;

    let nested = null;
    nested = items.map((item) => {
        if (item.items)
            return (
                <SidebarDropdown
                    key={item.label}
                    level={level + 1}
                    icon={item.icon}
                    items={item.items}
                    label={item.label}
                />
            );
        return (
            <NavLink className={classes.link} to={item.link} key={item.label}>
                {item.label}
            </NavLink>
        );
    });

    return (
        <>
            <UnstyledButton
                onClick={() => setOpened((o) => !o)}
                className={classes.control}
            >
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

                    <ChevronIcon className={classes.chevron} size={14} />
                </Group>
            </UnstyledButton>
            <Collapse className={classes.collapse} in={opened}>
                {nested}
            </Collapse>
        </>
    );
};

export const SidebarLinks = (props) => {
    return props.items.map((item) => {
        if (item.items) {
            return (
                <SidebarDropdown
                    level={1}
                    items={item.items}
                    label={item.label}
                    icon={item.icon}
                    key={item.label}
                />
            );
        }

        return (
            <Link to={item.link} key={item.label}>
                {item.label}
            </Link>
        );
    });
};

type StyleOptions = {
    opened: boolean;
    level: number;
};
const useStyles = createStyles((theme, options: StyleOptions) => ({
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

    chevron: {
        transition: 'transform 200ms ease',
        transform: options.opened
            ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
            : 'none',
    },
}));
