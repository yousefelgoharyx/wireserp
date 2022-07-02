import React, { useContext } from 'react';
import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core';
import { theme } from './theme/mantine';
import rtlPlugin from 'stylis-plugin-rtl';
import { useLocalStorage } from '@mantine/hooks';
import i18next from 'i18next';
type LangDirMap = {
    [key in Lang]: Dir;
};
const langDirMap: LangDirMap = {
    ar: 'rtl',
    en: 'ltr',
};

type Props = { children: React.ReactNode };

const LangContext = React.createContext<[Lang, (lang: Lang) => void]>(null);
export const useLang = () => useContext(LangContext);

const AppProvider = (props: Props) => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'wireserp-color-scheme',
        defaultValue: 'dark',
        getInitialValueInEffect: false,
    });

    const [dir, setDir] = useLocalStorage<Dir>({
        key: 'wireserp-dir',
        defaultValue: 'rtl',
        getInitialValueInEffect: false,
    });

    const [lang, setLang] = useLocalStorage<Lang>({
        key: 'wireserp-lang',
        defaultValue: 'ar',
        getInitialValueInEffect: false,
    });

    const toggleColorScheme = () => {
        const nextScheme = colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(nextScheme);
    };

    const updateLang = (lang: Lang) => {
        i18next.changeLanguage(lang);
        setDir(langDirMap[lang]);
        setLang(lang);
    };

    const emotion =
        dir === 'rtl'
            ? {
                  key: 'wireserp-rtl',
                  stylisPlugins: [rtlPlugin],
              }
            : { key: 'wireserp' };

    return (
        <LangContext.Provider value={[lang, updateLang]}>
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
        </LangContext.Provider>
    );
};

export default AppProvider;
