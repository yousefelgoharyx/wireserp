import { Paper, Stack, Text } from '@mantine/core';

const PosViewEmpty = () => (
  <Stack>
    <Paper shadow="sm" p={16}>
      <Stack
        align="center"
        justify="center"
        sx={{ flexGrow: 1, height: '100%' }}
      >
        <Text color="dimmed" size="lg" weight={700}>
          Add Products
        </Text>
      </Stack>
    </Paper>
  </Stack>
);

export default PosViewEmpty;
