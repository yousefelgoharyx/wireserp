import { ColorScheme, MantineThemeOverride } from '@mantine/core';

type Options = {
    colorScheme: ColorScheme;
    dir?: Dir;
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
