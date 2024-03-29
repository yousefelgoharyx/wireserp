import { Group, Stack, Text } from '@mantine/core';
import useSettings from '../api/useSettings';

const BalanceOfInput = ({ balance }: { balance: string }) => {
  const settings = useSettings();
  return (
    <Stack align="flex-end" sx={{ flex: 1, marginRight: 12 }}>
      <Group spacing={4} align="center">
        <Text size="xs">{settings.currency}</Text>
        <Text size="sm">{balance}</Text>
      </Group>
    </Stack>
  );
};

export default BalanceOfInput;
