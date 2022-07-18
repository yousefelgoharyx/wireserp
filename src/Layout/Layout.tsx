import { AppShell } from '@mantine/core';
import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Bar from './Bar';
import Sidebar from './Sidebar';

const Layout = () => {
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            header={<Bar opened={opened} onMenu={() => setOpened(!opened)} />}
            navbar={<Sidebar hide={() => setOpened(false)} open={opened} />}
            fixed
            navbarOffsetBreakpoint="sm"
            styles={(theme) => ({
                main: {
                    width: '100%',
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
        >
            <Suspense fallback={<Spinner />}>
                <Outlet />
            </Suspense>
        </AppShell>
    );
};

export default Layout;
