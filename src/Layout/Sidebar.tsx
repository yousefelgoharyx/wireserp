import {
    Avatar,
    createStyles,
    Group,
    Navbar,
    UnstyledButton,
    Text,
    ScrollArea,
    Transition,
} from '@mantine/core';
import { UserCircle } from 'tabler-icons-react';
import UserControl from '../components/UserControl';
import { LinksGroup } from './NavbarLinks';

const sidebar = [
    {
        label: 'العملاء',
        icon: UserCircle,
        links: [
            { label: 'اضافة عميل', link: '/' },
            { label: 'طباعة فاتورة', link: '/' },
            { label: 'تحيا مصر', link: '/' },
        ],
    },
    {
        label: 'الفواتير',
        icon: UserCircle,
        links: [
            { label: 'اضافة فاتورة', link: '/' },
            { label: 'طباعة فاتورة', link: '/' },
            { label: 'تحيا مصر', link: '/' },
        ],
    },
    {
        label: 'الفواتير',
        icon: UserCircle,
        links: [
            { label: 'اضافة فاتورة', link: '/' },
            { label: 'طباعة فاتورة', link: '/' },
            { label: 'تحيا مصر', link: '/' },
        ],
    },
    {
        label: 'الفواتير',
        icon: UserCircle,
        links: [
            { label: 'اضافة فاتورة', link: '/' },
            { label: 'طباعة فاتورة', link: '/' },
            { label: 'تحيا مصر', link: '/' },
        ],
    },
];
const Sidebar = ({ open }: { open: boolean }) => {
    const { classes } = useStyles();
    return (
        <Navbar
            hidden={!open}
            width={{ sm: 300, lg: 300 }}
            hiddenBreakpoint="sm"
        >
            <Navbar.Section grow component={ScrollArea}>
                {sidebar.map((group) => (
                    <LinksGroup {...group} />
                ))}
            </Navbar.Section>
            <Navbar.Section>
                <UserControl
                    onClick={() => {}}
                    source="https://avatars.githubusercontent.com/u/30435916?s=40&v=4"
                    name="Yousef"
                    email="yousefelgoharyx@gmail.com"
                />
            </Navbar.Section>
        </Navbar>
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
    },
    header: {
        padding: theme.spacing.sm,
    },
}));

export default Sidebar;
