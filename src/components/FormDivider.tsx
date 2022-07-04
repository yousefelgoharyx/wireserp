import { Divider, useMantineTheme } from '@mantine/core';

const FormDivider = () => {
    const theme = useMantineTheme();
    return (
        <Divider
            my={8}
            color={
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[3]
            }
        />
    );
};

export default FormDivider;
