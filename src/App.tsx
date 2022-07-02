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
import React, { useContext } from 'react';
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
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = () =>
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

    useHotkeys([['ctrl+J', toggleColorScheme]]);

    const emotion = {
        key: 'mantine',
        stylisPlugins: [rtlPlugin],
    };
    return (
        <ThemeContext.Provider value={[colorScheme, setColorScheme]}>
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    emotionOptions={emotion}
                    theme={theme({ colorScheme })}
                >
                    {props.children}
                </MantineProvider>
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
