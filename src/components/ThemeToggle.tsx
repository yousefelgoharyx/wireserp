import { createStyles, useMantineColorScheme } from '@mantine/core';
import { Moon, Sun } from 'tabler-icons-react';

const useStyles = createStyles({
    theme: {
        cursor: 'pointer',
        padding: 4,
        fontSize: 0,
    },
});

const ThemeToggle = () => {
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return (
        <div className={classes.theme} onClick={() => toggleColorScheme()}>
            {colorScheme === 'dark' ? <Sun /> : <Moon />}
        </div>
    );
};

export default ThemeToggle;
