interface PosInvoiceInfo {
  client_id: number;
  discount: number;
  withTax: boolean;
}

interface PosProductForm {
  id: number;
  price: number;
  quantity: number;
}

interface PosProduct extends PosProductForm {
  name: string;
}
