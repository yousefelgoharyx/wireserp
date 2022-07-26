import * as yup from 'yup';
const schema: yup.SchemaOf<ClientForm> = yup.object().shape({
  c_name: yup.string().required('Name is required'),
  releated_user: yup.string().typeError('Select a user').nullable(),
  indebt_type: yup.mixed().oneOf(['for', 'on']),
  indebt_amount: yup
    .number()
    .typeError('Please enter an amount')
    .required('Amount is required'),
  c_phone: yup.string().nullable(),
  c_address: yup.string().nullable(),
  c_notes: yup.string().nullable(),
  deal_type: yup
    .string()
    .typeError('Select deal type')
    .required('Deal type is required'),
  c_email: yup.string().nullable(),
  c_company: yup.string().nullable(),
  c_nationality: yup.string().nullable(),
  c_tax_number: yup.number().nullable(),
  id: yup.number(),
});

export default schema;
