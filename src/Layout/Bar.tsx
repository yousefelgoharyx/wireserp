import {
    Box,
    Burger,
    createStyles,
    Group,
    Header,
    MediaQuery,
    Text,
    useMantineTheme,
} from '@mantine/core';
import { LanguagePicker } from '../components/LangPicker';
import ThemeToggle from '../components/ThemeToggle';

const useStyles = createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));
const Bar = ({ onMenu, opened }) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    return (
        <Header height={80} p="md">
            <div className={classes.header}>
                <Group>
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
                <Group>
                    <ThemeToggle />
                    <LanguagePicker />
                </Group>
            </div>
        </Header>
    );
};

export default Bar;
