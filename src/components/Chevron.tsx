import { useMantineTheme } from '@mantine/core';
import { ChevronLeft, ChevronRight, IconProps } from 'tabler-icons-react';

type Props = {};

const Chevron = (props: IconProps) => {
    const theme = useMantineTheme();
    const ChevronIcon = theme.dir === 'ltr' ? ChevronRight : ChevronLeft;
    return <ChevronIcon {...props} />;
};

export default Chevron;
