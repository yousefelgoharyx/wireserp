import { atom } from 'recoil';

const invoiceProductsAtom = atom<PosProduct[]>({
  key: 'invoiceProductsAtom',
  default: [],
});

export default invoiceProductsAtom;
