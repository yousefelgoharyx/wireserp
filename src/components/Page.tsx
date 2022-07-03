import { Box, createStyles } from '@mantine/core';
import React from 'react';

type Props = {
    children: React.ReactNode;
};
const useStyles = createStyles((theme) => ({
    container: {
        padding: 8,
    },
}));
const Page = (props: Props) => {
    const { classes } = useStyles();
    return <Box className={classes.container}>{props.children}</Box>;
};

export default Page;
