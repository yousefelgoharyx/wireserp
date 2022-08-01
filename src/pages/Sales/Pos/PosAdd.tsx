import { Stack } from '@mantine/core';
import { usePosContext } from './context/PosContext';
import PosAddForm from './PosAddForm';

const PosAdd = () => {
  const { addProduct } = usePosContext();
  return (
    <Stack>
      <PosAddForm onAdd={addProduct} />
    </Stack>
  );
};

export default PosAdd;
