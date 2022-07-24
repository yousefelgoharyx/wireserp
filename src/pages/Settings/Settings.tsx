import { Paper, Tabs } from '@mantine/core';
import { Suspense } from 'react';
import Spinner, { FullSpinner } from '../../components/Spinner';
import Extra from './Extra';
import General from './General';

const Settings = () => {
  return (
    <Paper p={16}>
      <Tabs grow>
        <Tabs.Tab label="General">
          <General />
        </Tabs.Tab>
        <Tabs.Tab label="Extra">
          <Suspense fallback={<Spinner />}>
            <Extra />
          </Suspense>
        </Tabs.Tab>
        <Tabs.Tab label="Backup"></Tabs.Tab>
        <Tabs.Tab label="Invoices"></Tabs.Tab>
      </Tabs>
    </Paper>
  );
};

export default Settings;
