import { Box, createStyles } from '@mantine/core';

type Props = {
    children: React.ReactNode;
};

const FormGroup = (props: Props) => {
    const { classes } = useStyles();
    return <Box className={classes.root}>{props.children}</Box>;
};
const useStyles = createStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 16,
        '& > *': {
            flex: 1,
            minWidth: 220,
        },
    },
}));

export default FormGroup;
