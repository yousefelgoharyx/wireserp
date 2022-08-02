export type InvoiceInfoAction =
  | { type: 'change_client'; payload: { id: number } }
  | { type: 'change_tax'; payload: { value: boolean } }
  | { type: 'change_discount'; value: number };

function invoiceInfoReducer(
  invoiceInfo: PosInvoiceInfo,
  action: InvoiceInfoAction
): PosInvoiceInfo {
  switch (action.type) {
    case 'change_client':
      const newInvoiceInfo = { ...invoiceInfo };
      newInvoiceInfo.client_id = action.payload.id;
      return newInvoiceInfo;
    case 'change_tax':
      const newInfo = { ...invoiceInfo };
      newInfo.withTax = action.payload.value;
      return newInfo;
    case 'change_discount':
      const newData = { ...invoiceInfo };
      newData.discount = action.value;
      return newData;
    default:
      throw new Error('Action type must be specified');
  }
}

export default invoiceInfoReducer;
