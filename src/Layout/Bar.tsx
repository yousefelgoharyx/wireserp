import {
    Burger,
    createStyles,
    Group,
    Header,
    Image,
    MediaQuery,
    Text,
    useMantineColorScheme,
    useMantineTheme,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { LanguagePicker } from '../components/LangPicker';
import ThemeToggle from '../components/ThemeToggle';

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
}));
const Bar = ({ onMenu, opened }) => {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const { classes } = useStyles();
    const navigate = useNavigate();
    return (
        <Header height={70} px="md" className={classes.container}>
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
                    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                        <Image
                            onClick={() => navigate('/')}
                            src={
                                colorScheme === 'dark'
                                    ? 'https://digitwires.com/logo-white.svg'
                                    : 'https://digitwires.com/logo-full.svg'
                            }
                            height={35}
                        />
                    </MediaQuery>
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
