import { Stack } from '@mantine/core';
import BranchesProvider from './BranchesProvider';
import CreateBranch from './CreateBranch';
import ReadBranches from './ReadBranches';

const Branches = () => {
    return (
        <BranchesProvider>
            <Stack spacing={16}>
                <CreateBranch />
                <ReadBranches />
            </Stack>
        </BranchesProvider>
    );
};

export default Branches;
