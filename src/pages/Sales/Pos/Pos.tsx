import { Box, SimpleGrid, Stack, Title } from '@mantine/core';
import PosProvider from './context/PosContext';
import PosAdd from './PosAdd';
import PosControl from './PosControl';
import PosView from './PosView';

const Pos = () => {
  return (
    <PosProvider>
      <Title mb={16}>POS</Title>
      <Stack>
        <SimpleGrid breakpoints={[{ maxWidth: 'md', cols: 1 }]} cols={2}>
          <PosAdd />
          <PosControl />
        </SimpleGrid>
        <PosView />
      </Stack>
    </PosProvider>
  );
};

export default Pos;
