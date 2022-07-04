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
                items: [{ label: 'اضافة فرع', link: '/branches/create' }],
            },
            {
                label: 'المخازن',
                icon: UserCircle,
                items: [{ label: 'اضافة مخزن', link: '/' }],
            },
        ],
    },

    {
        label: 'الديون',
        icon: UserCircle,
        items: [
            {
                label: 'العملاء',
                icon: UserCircle,
                items: [{ label: 'اضافة فرع', link: '/' }],
            },
            {
                label: 'الموردين',
                icon: UserCircle,
                items: [{ label: 'اضافة مخزن', link: '/' }],
            },
        ],
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
