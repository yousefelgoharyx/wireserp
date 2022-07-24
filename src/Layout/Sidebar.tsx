import { Navbar, ScrollArea } from '@mantine/core';
import {
    Bucket,
    BuildingStore,
    BuildingWarehouse,
    Discount,
    LayoutGrid,
    ReportMoney,
    Switch2,
    UserCircle,
} from 'tabler-icons-react';
import { useAuth } from '../AuthProvider';
import UserControl from '../components/UserControl';
import { SidebarLinks } from './SidebarLinks';

const sidebar = [
    {
        label: 'Store',
        icon: BuildingStore,
        items: [
            {
                label: 'Branches',
                icon: Switch2,
                items: [{ label: 'All branches', to: '/branches' }],
            },

            {
                label: 'Warehouses',
                icon: BuildingWarehouse,
                items: [
                    { label: 'Warehouses', to: '/warehouses' },
                    {
                        label: 'Transfer between warehouses',
                        to: '/warehouses/transfer',
                    },
                    { label: 'Inventoy', to: '/warehouses/inventory' },
                ],
            },
            {
                label: 'Product',
                icon: Bucket,
                items: [
                    { label: 'Add product', to: '/products/add' },
                    { label: 'List of products', to: '/products' },
                ],
            },
            {
                label: 'Categories',
                icon: LayoutGrid,
                items: [
                    { label: 'Main categories', to: '/categories' },
                    { label: 'Sub categories', to: '/sub-categories' },
                ],
            },
        ],
    },
    {
        label: 'Debts',
        icon: ReportMoney,
        items: [
            {
                label: 'Client',
                icon: UserCircle,
                items: [
                    { label: 'Add client', to: '/clients/create' },
                    { label: 'List of clients', to: '/clients' },
                ],
            },
            {
                label: 'Suppliers',
                icon: UserCircle,
                items: [
                    { label: 'Add supplier', to: '/suppliers/create' },
                    { label: 'List of suppliers', to: '/suppliers' },
                ],
            },
        ],
    },

    {
        label: 'Finance',
        icon: ReportMoney,
        items: [
            {
                label: 'Safes',
                icon: UserCircle,
                items: [
                    { label: 'Add Safe', to: '/safes' },
                    { label: 'Transfer between safes', to: '/safes/transfer' },
                ],
            },
            {
                label: 'Banks',
                icon: UserCircle,
                items: [
                    { label: 'List of Banks', to: '/banks' },
                    { label: 'Bank Activities', to: '/banks/activity' },
                    {
                        label: 'Transfer between Banks',
                        to: '/banks/banks-transfer',
                    },
                    {
                        label: 'Transfer from Bank to Safe',
                        to: '/banks/bank-to-safe',
                    },
                    {
                        label: 'Transfer from Safe to Bank',
                        to: '/banks/safe-to-bank',
                    },
                ],
            },
        ],
    },

    {
        label: 'Coupons',
        icon: Discount,
        to: '/coupons',
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
