import { useState } from 'react';
import {
    Group,
    Box,
    Collapse,
    UnstyledButton,
    createStyles,
} from '@mantine/core';
import { Icon as TablerIcon } from 'tabler-icons-react';
import { NavLink, useNavigate } from 'react-router-dom';
import Chevron from '../components/Chevron';
import LeveledIcon from '../components/LeveledIcon';

type SidebarDropdownProps = {
    level: number;
    icon: TablerIcon;
    label: string;
    items: any;
    to?: string;
    opened: boolean;
    toggle: () => void;
};
const SidebarDropdown = (props: SidebarDropdownProps) => {
    const { level, icon: Icon, label, items, opened, toggle } = props;
    const { classes } = useStyles({ opened: opened });
    const navigate = useNavigate();

    const [active, setActive] = useState(null);
    const handleClick = () => {
        toggle();
        if (props.to) navigate(props.to);
    };

    let nested = null;
    if (items) {
        nested = items.map((item, i) => {
            if (item.items) {
                return (
                    <SidebarDropdown
                        opened={active === i}
                        toggle={() => setActive(active === i ? null : i)}
                        key={item.label}
                        level={level + 1}
                        to={item.to}
                        icon={item.icon}
                        items={item.items}
                        label={item.label}
                    />
                );
            }

            return (
                <NavLink className={classes.link} to={item.to} key={item.label}>
                    {item.label}
                </NavLink>
            );
        });
    }

    return (
        <>
            <UnstyledButton onClick={handleClick} className={classes.control}>
                <Group position="apart" spacing={0}>
                    <Box className={classes.controlInfo}>
                        <LeveledIcon level={level} size={32}>
                            <Icon size={24} />
                        </LeveledIcon>

                        <Box ml="md">{label}</Box>
                    </Box>

                    {items && <Chevron className={classes.chevron} size={14} />}
                </Group>
            </UnstyledButton>
            <Collapse className={classes.collapse} in={opened}>
                {nested}
            </Collapse>
        </>
    );
};

export const SidebarLinks = (props) => {
    const [active, setActive] = useState(null);
    return props.items.map((item, i) => {
        return (
            <SidebarDropdown
                opened={active === i}
                toggle={() => setActive(active === i ? null : i)}
                level={1}
                items={item.items}
                label={item.label}
                icon={item.icon}
                key={item.label}
                to={item.to}
            />
        );
    });
};

type StyleOptions = {
    opened: boolean;
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
