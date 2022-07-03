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
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            header={<Bar opened={opened} onMenu={() => setOpened(!opened)} />}
            navbar={<Sidebar open={opened} />}
            fixed
            navbarOffsetBreakpoint="sm"
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
        >
            <Outlet />
        </AppShell>
    );
};

export default Layout;
