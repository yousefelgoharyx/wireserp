interface PosInvoiceInfo {
  client_id: number;
  products: PosProductForm[];
  discount: number;
  price: number;
  total_price: number;
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
