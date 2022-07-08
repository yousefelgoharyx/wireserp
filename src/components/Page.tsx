import { Box, Container, createStyles } from '@mantine/core';
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
    return (
        <Container size="lg" className={classes.container}>
            {props.children}
        </Container>
    );
};

export default Page;
