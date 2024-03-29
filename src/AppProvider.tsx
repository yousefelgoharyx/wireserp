import React, { useContext, useLayoutEffect } from 'react';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import { theme } from './theme/mantine';
import rtlPlugin from 'stylis-plugin-rtl';
import { useLocalStorage } from '@mantine/hooks';
import i18next from 'i18next';
import { NotificationsProvider } from '@mantine/notifications';
import { RecoilRoot } from 'recoil';
type Props = { children: React.ReactNode };

const LangContext = React.createContext<[Lang, (lang: Lang) => void]>(null);
export const useLang = () => useContext(LangContext);

const AppProvider = (props: Props) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'wireserp-color-scheme',
    defaultValue: 'light',
  });

  const [lang, setLang] = useLocalStorage<Lang>({
    key: 'wireserp-lang',
    defaultValue: 'ar',
  });
  useLayoutEffect(() => {
    i18next.changeLanguage(lang);
  }, [lang]);

  const dir = i18next.dir(lang);

  const toggleColorScheme = () => {
    const nextScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(nextScheme);
  };

  const updateLang = (lang: Lang) => {
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
            <NotificationsProvider>
              <ModalsProvider>
                <RecoilRoot>{props.children}</RecoilRoot>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </div>
      </ColorSchemeProvider>
    </LangContext.Provider>
  );
};

export default AppProvider;
