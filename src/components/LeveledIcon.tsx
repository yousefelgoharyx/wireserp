import { ThemeIcon, ThemeIconProps, ThemeIconVariant } from '@mantine/core';
type Props = {
    level: number;
    children: React.ReactNode;
};
const LeveledIcon = (props: Props & ThemeIconProps) => {
    const { level, ...rest } = props;
    let variant: ThemeIconVariant = 'filled';
    if (level === 2) variant = 'light';
    if (level === 3) variant = 'outline';
    return (
        <ThemeIcon {...rest} variant={variant}>
            {props.children}
        </ThemeIcon>
    );
};

export default LeveledIcon;
