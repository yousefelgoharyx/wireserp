import { Button, Group, Paper, Select, Stack, Switch } from '@mantine/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useClientsList } from '../../../api/debts/useClients';
import MoneyInput from '../../../components/MoneyInput';
import { paymentMethods } from '../../../constants/constants';
import { stringify } from '../../../utils/all';
import invoiceInfoAtom from './atoms/invoiceInfo';
import invoiceProductsAtom from './atoms/invoiceProducts';
const PosControl = () => {
  const { selectItems: clients } = useClientsList();
  const invoiceProducts = useRecoilValue(invoiceProductsAtom);
  const [invoiceInfo, setInvoiceInfo] = useRecoilState(invoiceInfoAtom);
  function handleClientChange(v: string) {
    setInvoiceInfo({ ...invoiceInfo, client_id: +v });
  }

  function handleTaxesChange(value: boolean) {
    setInvoiceInfo({ ...invoiceInfo, withTax: value });
  }

  function handleDiscountChange(v: number) {
    setInvoiceInfo({ ...invoiceInfo, discount: v });
  }

  function handleSave() {
    console.log(invoiceInfo);
  }
  return (
    <Paper p={16}>
      <Stack sx={{ height: '100%' }}>
        <Select
          label="Client"
          data={clients}
          placeholder="Select client"
          onChange={handleClientChange}
          value={stringify(invoiceInfo.client_id)}
        />
        <Select
          data={[
            {
              label: 'Aramex',
              value: 'aramex',
            },
          ]}
          label="Shipping company"
          placeholder="Select a shipping company"
        />
        <Select
          data={paymentMethods}
          label="Payment method"
          value={paymentMethods[0].value}
          placeholder="Select payment method"
        />
        <MoneyInput
          label="Discount"
          placeholder="Enter dicount"
          value={invoiceInfo.discount}
          onChange={handleDiscountChange}
        />
        <Group sx={{ marginTop: 'auto' }}>
          <Button
            onClick={handleSave}
            disabled={invoiceProducts.length === 0 || !invoiceInfo.client_id}
          >
            Save and print
          </Button>
          <Switch
            size="md"
            onLabel="YES"
            offLabel="NO"
            label="Add taxes?"
            checked={invoiceInfo.withTax}
            onChange={(e) => handleTaxesChange(e.currentTarget.checked)}
          />
        </Group>
      </Stack>
    </Paper>
  );
};

export default PosControl;
