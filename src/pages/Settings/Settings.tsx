import { Paper, Stack, Tabs } from '@mantine/core';
import { Suspense } from 'react';
import Spinner from '../../components/Spinner';
import Extra from './Extra';
import FiscalYear from './FiscalYear';
import General from './General';
import Taxes from './Taxes';

function SettingsSuspender() {
  return (
    <Stack my={32}>
      <Spinner />
    </Stack>
  );
}
const Settings = () => {
  return (
    <Paper p={16}>
      <Tabs grow>
        <Tabs.Tab label="General">
          <General />
        </Tabs.Tab>
        <Tabs.Tab label="Extra">
          <Suspense fallback={<SettingsSuspender />}>
            <Extra />
          </Suspense>
        </Tabs.Tab>
        <Tabs.Tab label="Fiscal year">
          <FiscalYear />
        </Tabs.Tab>
        <Tabs.Tab label="Taxes">
          <Taxes />
        </Tabs.Tab>
      </Tabs>
    </Paper>
  );
};

export default Settings;
