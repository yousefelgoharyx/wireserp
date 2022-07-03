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

    const handleToggleColorScheme = () => {
        const range = document.createRange();
        const frag = range.createContextualFragment(`
      <style>
        *{
            transition: background-color 150ms linear, border-color 150ms linear, stroke 150ms linear;
        }
      </style>
      `);
        document.querySelector('head').append(frag);
        toggleColorScheme();
    };

    return (
        <div className={classes.theme} onClick={handleToggleColorScheme}>
            {colorScheme === 'dark' ? <Sun /> : <Moon />}
        </div>
    );
};

export default ThemeToggle;
