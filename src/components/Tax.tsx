import { Group, Stack, Text } from '@mantine/core';
import { Percentage } from 'tabler-icons-react';
import useSettings from '../api/useSettings';

const Tax = () => {
  const settings = useSettings();
  return (
    <Stack align="flex-end" sx={{ flex: 1, marginRight: 12 }}>
      <Group spacing={4} align="center">
        <Text size="xs">{settings.tax_value_added}</Text>
        <Percentage size={14} />
      </Group>
    </Stack>
  );
};

export default Tax;
