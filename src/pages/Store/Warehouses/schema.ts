import * as yup from 'yup';
const schema = yup.object().shape({
    warehouse_name: yup.string().required('Name is required'),
    branch_id: yup.string().required('Branch is required'),
});

export const transferScheme = yup.object().shape({
    from_warehouse: yup
        .string()
        .typeError('Choose a warehouse')
        .required('From warehouse is required'),
    to_warehouse: yup
        .string()
        .typeError('Choose a warehouse')
        .required('To warehouse is required'),
    product_id: yup
        .string()
        .typeError('Choose a Products')
        .required('Product is required'),
    date: yup.date().typeError('Choose a date').required('Date is required'),
    note: yup.string().required('Notes is required'),
});

export default schema;
