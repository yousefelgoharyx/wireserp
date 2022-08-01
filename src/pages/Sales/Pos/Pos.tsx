import { Box, SimpleGrid, Stack, Title } from '@mantine/core';
import PosProvider from './context/PosContext';
import PosAdd from './PosAdd';
import PosView from './PosView';

const Pos = () => {
  return (
    <PosProvider>
      <Title mb={16}>POS</Title>
      <SimpleGrid breakpoints={[{ maxWidth: 'md', cols: 1 }]} cols={2}>
        <PosAdd />
        <PosView />
      </SimpleGrid>
    </PosProvider>
  );
};

export default Pos;
