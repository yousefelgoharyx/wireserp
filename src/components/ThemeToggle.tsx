import { createStyles, ThemeIcon } from '@mantine/core';
import { Moon, Sun } from 'tabler-icons-react';
import { useTheme } from '../App';

const useStyles = createStyles({
    theme: {
        cursor: 'pointer',
        padding: 4,
    },
});

const ThemeToggle = () => {
    const { classes } = useStyles();
    const [theme, setTheme] = useTheme();
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
    return (
        <ThemeIcon
            className={classes.theme}
            size="lg"
            variant="light"
            onClick={toggleTheme}
        >
            {theme === 'dark' ? <Sun /> : <Moon />}
        </ThemeIcon>
    );
};

export default ThemeToggle;
