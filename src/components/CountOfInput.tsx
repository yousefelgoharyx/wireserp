import { Group, Stack, Text } from '@mantine/core';

const CountOfInput = ({ count }: { count: any }) => {
  return (
    <Stack align="flex-end" sx={{ flex: 1, marginRight: 12 }}>
      <Group spacing={4} align="center">
        <Text size="xs">{count}</Text>
      </Group>
    </Stack>
  );
};

export default CountOfInput;
