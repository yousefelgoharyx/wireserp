import * as yup from 'yup';
let fieldRequired = 'This field is required';
export const SaleBillForm: yup.SchemaOf<SaleBillForm> = yup.object().shape({
  client_id: yup.number().required(fieldRequired).typeError('Select a client'),
  date_time: yup.date().required(fieldRequired).typeError('Select a date'),
  warehouse_id: yup
    .number()
    .required(fieldRequired)
    .typeError('Select a warehouse'),
  value_added_tax: yup
    .number()
    .required(fieldRequired)
    .typeError('Enter a value added tax'),
  final_total: yup
    .number()
    .required(fieldRequired)
    .typeError('Enter a final total'),
  product_id: yup
    .number()
    .required(fieldRequired)
    .typeError('Select a product'),
  product_price: yup
    .number()
    .required(fieldRequired)
    .typeError('Enter a product price'),
  quantity: yup.number().required(fieldRequired).typeError('Enter a quantity'),
  unit: yup.string().required(fieldRequired).typeError('Enter a unit'),
  quantity_price: yup
    .number()
    .required(fieldRequired)
    .typeError('Enter a quantity price'),
});
