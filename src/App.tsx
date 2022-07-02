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

type DirContextType = [Dir, (dir: Dir) => void];
const DirContext = React.createContext<DirContextType>(null);

export const useTheme = () => useContext<ThemeContextType>(ThemeContext);
export const useDir = () => useContext<DirContextType>(DirContext);

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
    };

    const emotion =
        dir === 'rtl'
            ? {
                  key: 'mantine-rtl',
                  stylisPlugins: [rtlPlugin],
              }
            : { key: 'mantine' };
    useHotkeys([['ctrl+J', toggleColorScheme]]);
    useHotkeys([['ctrl+D', toggleDir]]);

    return (
        <ThemeContext.Provider value={[colorScheme, setColorScheme]}>
            <DirContext.Provider value={[dir, setDir]}>
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
            </DirContext.Provider>
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
