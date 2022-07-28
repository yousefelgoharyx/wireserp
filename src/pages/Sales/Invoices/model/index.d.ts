interface InvoiceForm {
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

interface InvoiceItem {
  product_name: string;
  product_price: number;
  amount: string;
  total_price: number;
  product_id: number;
}

interface InvoiceProductForm {
  sale_bill_id: number;
  product_id: number;
  product_price: number;
  quantity: number;
  unit: string;
  quantity_price: number;
  final_total: number;
}

interface ExpenseForm {
  action: Expense;
  action_type: ExpenseType;
  value: number;
}

interface PaymentForm {
  value: number;
}
