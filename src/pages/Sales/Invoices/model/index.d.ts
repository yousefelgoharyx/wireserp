interface SaleBillForm {
  client_id: number;
  date_time: Date;
  warehouse_id: number;
  value_added_tax: string;
  final_total: number;
  product_id: number;
  product_price: number;
  quantity: number;
  unit: string;
  quantity_price: number;
}

interface SaleBillTable {
  product_name: string;
  product_price: number;
  amount: string;
  total_price: number;
}
