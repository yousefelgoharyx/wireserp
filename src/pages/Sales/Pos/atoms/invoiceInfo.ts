import { atom } from 'recoil';

const invoiceInfoAtom = atom<PosInvoiceInfo>({
  key: 'invoiceInfoAtom',
  default: {
    client_id: null,
    discount: 0,
    withTax: true,
  },
});

export default invoiceInfoAtom;
