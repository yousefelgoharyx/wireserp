import { Navbar, ScrollArea } from '@mantine/core';
import { UserCircle } from 'tabler-icons-react';
import { useAuth } from '../AuthProvider';
import UserControl from '../components/UserControl';
import { SidebarLinks } from './SidebarLinks';

const sidebar = [
    {
        label: 'المنتجات',
        icon: UserCircle,
        items: [
            {
                label: 'الفروع',
                icon: UserCircle,
                to: '/branches',
                items: [{ label: 'اضافة فرع', to: '/branches/create' }],
            },
            {
                label: 'المخازن',
                icon: UserCircle,
                to: '/storages',
                items: [{ label: 'اضافة مخزن', to: '/storages/create' }],
            },
        ],
    },
    {
        label: 'الديون',
        icon: UserCircle,
        items: [
            {
                label: 'الفروع',
                icon: UserCircle,
                to: '/branches',
                items: [{ label: 'اضافة فرع', to: '/branches/create' }],
            },
            {
                label: 'المخازن',
                icon: UserCircle,
                to: '/storages',
                items: [{ label: 'اضافة مخزن', to: '/storages/create' }],
            },
        ],
    },

    {
        label: 'POS',
        icon: UserCircle,
        to: '/pos',
    },
];
const Sidebar = ({ open }: { open: boolean }) => {
    const { user } = useAuth();
    return (
        <Navbar
            hidden={!open}
            width={{ sm: 300, lg: 300 }}
            hiddenBreakpoint="sm"
        >
            <Navbar.Section grow component={ScrollArea}>
                <SidebarLinks items={sidebar} />
            </Navbar.Section>
            <Navbar.Section>
                <UserControl
                    source="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                    name={user.manager_name}
                    email={user.manager_email}
                />
            </Navbar.Section>
        </Navbar>
    );
};

export default Sidebar;
