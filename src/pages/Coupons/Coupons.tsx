import { Stack } from '@mantine/core';
import React from 'react';
import CouponsForm from './CouponsForm';
import CouponsTable from './CouponsTable';

const Coupons = () => {
    return (
        <Stack>
            <CouponsForm />
            <CouponsTable />
        </Stack>
    );
};

export default Coupons;
