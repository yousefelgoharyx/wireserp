import * as yup from 'yup';
let fieldRequired = 'This field is required';
export const ReturnProductSchema: yup.SchemaOf<ReturnProductForm> = yup
  .object()
  .shape({
    id: yup.number().required(fieldRequired).typeError('Select an invoice'),
    product_id: yup
      .number()
      .required(fieldRequired)
      .typeError('Select a product'),
    date_time: yup.date().required(fieldRequired).typeError('Select a date'),
    notes: yup.string().required(fieldRequired).typeError('Enter a note'),
    quantity: yup
      .number()
      .min(1, 'Quantity must be greater than 0')
      .required(fieldRequired)
      .typeError('Enter a quantity'),
  });
