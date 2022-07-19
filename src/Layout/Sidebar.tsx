import { Navbar, ScrollArea } from '@mantine/core';
import {
    Bucket,
    BuildingStore,
    BuildingWarehouse,
    LayoutGrid,
    Switch2,
    UserCircle,
} from 'tabler-icons-react';
import { useAuth } from '../AuthProvider';
import UserControl from '../components/UserControl';
import { SidebarLinks } from './SidebarLinks';

const sidebar = [
    {
        label: 'المتجر',
        icon: BuildingStore,
        items: [
            {
                label: 'الفروع',
                icon: Switch2,
                items: [{ label: 'جميع الفروع', to: '/branches' }],
            },

            {
                label: 'المخازن',
                icon: BuildingWarehouse,
                items: [
                    { label: 'المخازن', to: '/warehouses' },
                    { label: 'تحويل بين المخازن', to: '/warehouses/transfer' },
                    { label: 'جرد المخازن', to: '/warehouses/inventory' },
                ],
            },
            {
                label: 'المنتجات',
                icon: Bucket,
                items: [
                    { label: 'اضافة منتج', to: '/products/add' },
                    { label: 'جميع المنتجات', to: '/products' },
                ],
            },
            {
                label: 'الفئات',
                icon: LayoutGrid,
                items: [
                    { label: 'الفئات الرئيسية', to: '/categories' },
                    { label: 'الفئات الفرعية', to: '/sub-categories' },
                ],
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
                items: [
                    { label: 'اضافة عميل', to: '/clients/create' },
                    { label: 'جميع العملاء', to: '/clients' },
                ],
            },
            {
                label: 'الموردين',
                icon: UserCircle,
                items: [{ label: 'اضافة مخزن', to: '/suppliers' }],
            },
        ],
    },

    {
        label: 'POS',
        icon: UserCircle,
        to: '/pos',
    },
];

type Props = { open: boolean; hide: () => void };
const Sidebar = ({ open, hide }: Props) => {
    const { user } = useAuth();
    return (
        <Navbar
            hidden={!open}
            width={{ sm: 300, lg: 300 }}
            hiddenBreakpoint="sm"
        >
            <Navbar.Section grow component={ScrollArea}>
                <SidebarLinks hide={hide} items={sidebar} />
            </Navbar.Section>
            <Navbar.Section>
                <UserControl
                    source="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                    name={user.full_name}
                    email={user.email}
                />
            </Navbar.Section>
        </Navbar>
    );
};

export default Sidebar;
