import { Paper, Stack, Title } from '@mantine/core';
import PosViewItems from './PosViewItems';

const PosView = () => {
  return (
    <Paper p={16}>
      <Stack sx={{ height: '100%' }}>
        <Title order={3}>Products</Title>
        <PosViewItems />
      </Stack>
    </Paper>
  );
};

export default PosView;
