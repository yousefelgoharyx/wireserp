import { MantineThemeOverride } from '@mantine/core';

type Options = {
    colorScheme: 'light' | 'dark';
    dir?: 'rtl' | 'ltr';
};
export function theme({
    colorScheme,
    dir = 'rtl',
}: Options): MantineThemeOverride {
    return {
        fontFamily: 'Cairo',
        colorScheme,
        dir,
        primaryColor: 'teal',
    };
}
