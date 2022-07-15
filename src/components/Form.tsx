import { createStyles } from '@mantine/core';
import React from 'react';

interface Props extends JSX.Element {
    children: React.ReactNode;
}

const Form = ({ children, ...rest }: Props) => {
    const { classes } = useStyles();
    return (
        <form className={classes.form} {...rest}>
            {children}
        </form>
    );
};

const useStyles = createStyles({
    form: {
        width: '100%',
    },
});

export default Form;
