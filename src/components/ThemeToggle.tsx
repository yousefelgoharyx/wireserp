import { createStyles, ThemeIcon } from '@mantine/core';
import { Moon, Sun } from 'tabler-icons-react';
import { useTheme } from '../App';

const useStyles = createStyles({
    theme: {
        cursor: 'pointer',
        padding: 4,
        fontSize: 0,
    },
});

const ThemeToggle = () => {
    const { classes } = useStyles();
    const [theme, setTheme] = useTheme();
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
    return (
        <div className={classes.theme} onClick={toggleTheme}>
            {theme === 'dark' ? <Sun /> : <Moon />}
        </div>
    );
};

export default ThemeToggle;
