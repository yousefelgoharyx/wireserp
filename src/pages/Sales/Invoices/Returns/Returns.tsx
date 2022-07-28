import { Stack } from '@mantine/core';
import { useReturnsQuery } from '../../../../api/sales/useReturns';
import DataGrid from '../../../../components/DataGrid';
import { getReturnCols } from './model/columns';

const Returns = () => {
  const { data } = useReturnsQuery();
  return (
    <Stack>
      <DataGrid columns={getReturnCols()} data={data} />
    </Stack>
  );
};

export default Returns;
