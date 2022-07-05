import { createStyles, Loader, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
type Props = {
    form: UseFormReturnType<any>;
};
const Final = (props: Props) => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(props.form.values);
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }, []);
    return (
        <Stack className={classes.loader} align="center">
            <Loader size="lg" />
            <Text>Please Wait...</Text>
        </Stack>
    );
};

const useStyles = createStyles({
    root: {
        minHeight: '100vh',
        alignItems: 'stretch',
        padding: 32,
        maxWidth: 992,
        margin: '0 auto',
    },
    stepper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    loader: {
        justifyContent: 'center',
        flex: 1,
    },
});
export default Final;
