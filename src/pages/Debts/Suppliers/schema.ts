import * as yup from 'yup';
const schema: yup.SchemaOf<SupplierFormValues> = yup.object().shape({
    s_name: yup.string().required('Name is required'),
    indebt_type: yup.mixed().oneOf(['for', 'on']),
    indebt_amount: yup
        .number()
        .typeError('Please enter an amount')
        .required('Amount is required'),
    s_phone: yup.string().nullable(),
    s_address: yup.string().nullable(),
    s_notes: yup.string().nullable(),
    deal_type: yup
        .string()
        .typeError('Select deal type')
        .required('Deal type is required'),
    s_email: yup.string().nullable(),
    s_company: yup.string().nullable(),
    s_nationality: yup.string().nullable(),
    s_tax_number: yup.number().nullable(),
    id: yup.number(),
});

export default schema;
