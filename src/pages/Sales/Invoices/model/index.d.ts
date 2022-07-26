interface SaleBillForm {
  client_id: number;
  date_time: Date;
  warehouse_id: number;
  value_added_tax: number;
  final_total: number;
  product_id: number;
  product_price: number;
  quantity: number;
  unit: string;
  quantity_price: number;
}
