import { AppShell, Button, Stack, Text } from '@mantine/core';
import { Suspense, useState } from 'react';
import { useQueryErrorResetBoundary } from 'react-query';
import { Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Bar from './Bar';
import Sidebar from './Sidebar';
import { ErrorBoundary } from 'react-error-boundary';

const Layout = () => {
    const [opened, setOpened] = useState(false);
    const { reset } = useQueryErrorResetBoundary();

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
            <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary }) => (
                    <Stack
                        align="center"
                        justify="center"
                        style={{ height: '100%' }}
                    >
                        <Text>There was an error!</Text>
                        <Button onClick={() => resetErrorBoundary()}>
                            Try again
                        </Button>
                    </Stack>
                )}
            >
                <Suspense fallback={<Spinner />}>
                    <Outlet />
                </Suspense>
            </ErrorBoundary>
        </AppShell>
    );
};

export default Layout;
