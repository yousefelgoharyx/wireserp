import { Navbar, ScrollArea } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'tabler-icons-react';
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
        label: 'POS',
        icon: UserCircle,
        to: '/pos',
    },
];
const Sidebar = ({ open }: { open: boolean }) => {
    const navigate = useNavigate();
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
                    onClick={() => navigate('settings')}
                    source="https://avatars.githubusercontent.com/u/30435916?s=40&v=4"
                    name="Yousef"
                    email="yousefelgoharyx@gmail.com"
                />
            </Navbar.Section>
        </Navbar>
    );
};

export default Sidebar;
