import { Stack } from '@mantine/core';
import { Suspense } from 'react';
import Spinner from '../../components/Spinner';
import CreateBranch from './CreateBranch';
import ReadBranches from './ReadBranches';

type Props = {};

const Branches = (props: Props) => {
    return (
        <div>
            <Stack spacing={16}>
                <CreateBranch />
                <Suspense fallback={<Spinner />}>
                    <ReadBranches />
                </Suspense>
            </Stack>
        </div>
    );
};

export default Branches;
