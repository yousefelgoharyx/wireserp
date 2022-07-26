import { Button, Group, Select, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import useGetBranches from '../../../api/store/useBranches';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import instance from '../../../utils/axios';
import getApiError from '../../../utils/getApiError';
import schema from './schema';

function createWarehouse(values: WarehouseFormValues) {
  return instance.post('/add-warehouse', values);
}

const WarehousesForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<WarehouseFormValues>({
    validate: yupResolver(schema),
    initialValues: {
      warehouse_name: '',
      branch_id: undefined,
    },
  });
  const { data } = useGetBranches();
  const createOwner = useMutation(createWarehouse, {
    onSuccess: () => queryClient.invalidateQueries(['warehouses']),
  });

  const branches = useMemo(() => {
    return data.map((branch) => ({
      label: branch.branch_name,
      value: branch.id.toString(),
    }));
  }, [data]);

  async function handleSubmit(values: WarehouseFormValues) {
    try {
      await createOwner.mutateAsync(values);
      showNotification({
        title: 'Success',
        message: 'Warehouse created successfully',
      });
    } catch (error) {
      showNotification({
        title: 'Success',
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }
  return (
    <FormShell title="Add Warehouse">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <FormGrid>
            <TextInput
              label="Name"
              placeholder="Warehouse name"
              {...form.getInputProps('warehouse_name')}
            />
            <Select
              data={branches}
              placeholder="Select Branch"
              label="Branch"
              {...form.getInputProps('branch_id')}
            />
          </FormGrid>
          <FormDivider />

          <Group>
            <Button loading={createOwner.isLoading} type="submit">
              Add
            </Button>
          </Group>
        </Stack>
      </form>
    </FormShell>
  );
};

export default WarehousesForm;
