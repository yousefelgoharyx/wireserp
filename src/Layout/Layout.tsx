import {
    AppShell,
    Burger,
    Header,
    MediaQuery,
    Text,
    useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Bar from './Bar';
import Sidebar from './Sidebar';

const Layout = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            header={<Bar opened={opened} onMenu={() => setOpened(!opened)} />}
            navbar={<Sidebar open={opened} />}
            fixed
            navbarOffsetBreakpoint="sm"
        >
            <Outlet />
        </AppShell>
    );
};

export default Layout;
