import { SimpleGrid } from '@mantine/core';
import React from 'react';

const FormGrid = (props: { children: React.ReactNode }) => {
    return (
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            {props.children}
        </SimpleGrid>
    );
};

export default FormGrid;
