import { SimpleGrid } from '@mantine/core';

const SettingsGrid = ({ children }) => {
  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: 'sm', cols: 1 },
        { maxWidth: 'md', cols: 2 },
      ]}
    >
      {children}
    </SimpleGrid>
  );
};

export default SettingsGrid;
