import { Group, Stack, Text } from '@mantine/core';

const BalanceOfInput = ({ balance }: { balance: string }) => {
  return (
    <Stack align="flex-end" sx={{ flex: 1, marginRight: 12 }}>
      <Group spacing={4} align="center">
        <Text size="xs">EGP</Text>
        <Text size="sm">{balance}</Text>
      </Group>
    </Stack>
  );
};

export default BalanceOfInput;
