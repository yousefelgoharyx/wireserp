import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './Layout/Layout';
import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core';
import { theme } from './theme/mantine';
import rtlPlugin from 'stylis-plugin-rtl';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import React, { useContext, useLayoutEffect } from 'react';

type Dir = 'ltr' | 'rtl';
type Props = {
    children: React.ReactNode;
};
type ThemeContextType = [ColorScheme, (colorScheme: ColorScheme) => void];
const ThemeContext = React.createContext<ThemeContextType>(null);

export const useTheme = () => useContext<ThemeContextType>(ThemeContext);
const AppProvider = (props: Props) => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'dark',
        getInitialValueInEffect: false,
    });

    const [dir, setDir] = useLocalStorage<Dir>({
        key: 'mantine-dir',
        defaultValue: 'rtl',
        getInitialValueInEffect: false,
    });

    const toggleColorScheme = () => {
        const nextScheme = colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(nextScheme);
    };

    const toggleDir = () => {
        const nextDir = dir === 'rtl' ? 'ltr' : 'rtl';
        setDir(nextDir);
        window.location.reload();
    };
    useHotkeys([['ctrl+J', toggleColorScheme]]);
    useHotkeys([['ctrl+D', toggleDir]]);

    const emotion =
        dir === 'rtl'
            ? {
                  key: 'mantine',
                  stylisPlugins: [rtlPlugin],
              }
            : { key: 'mantine' };
    return (
        <ThemeContext.Provider value={[colorScheme, setColorScheme]}>
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <div dir={dir}>
                    <MantineProvider
                        withGlobalStyles
                        withNormalizeCSS
                        emotionOptions={emotion}
                        theme={theme({ colorScheme, dir })}
                    >
                        {props.children}
                    </MantineProvider>
                </div>
            </ColorSchemeProvider>
        </ThemeContext.Provider>
    );
};
function App() {
    return (
        <AppProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </AppProvider>
    );
}

export default App;
