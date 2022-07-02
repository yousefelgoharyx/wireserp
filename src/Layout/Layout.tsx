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
import Sidebar from './Sidebar';

const Layout = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            header={
                <Header height={70} p="md">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <MediaQuery
                            largerThan="sm"
                            styles={{ display: 'none' }}
                        >
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Text>Wires ERP</Text>
                    </div>
                </Header>
            }
            fixed
            navbarOffsetBreakpoint="sm"
            navbar={<Sidebar open={opened} />}
        >
            <Outlet />
        </AppShell>
    );
};

export default Layout;
