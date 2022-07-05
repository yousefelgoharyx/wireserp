import { Stack } from '@mantine/core';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

const StepShell = (props: Props) => {
    return <Stack align="center">{props.children}</Stack>;
};

export default StepShell;
