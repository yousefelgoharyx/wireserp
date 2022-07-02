import {
    Burger,
    Group,
    Header,
    MediaQuery,
    Text,
    useMantineTheme,
} from '@mantine/core';
import ThemeToggle from '../components/ThemeToggle';

const Bar = ({ onMenu, opened }) => {
    const theme = useMantineTheme();
    return (
        <Header height={70} p="md">
            <Group align="center" spacing={8}>
                <ThemeToggle />
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                        opened={opened}
                        onClick={onMenu}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>

                <Text>Wires ERP</Text>
            </Group>
        </Header>
    );
};

export default Bar;
