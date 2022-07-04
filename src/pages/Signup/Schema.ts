import * as yup from 'yup';
const schema = yup.object().shape({
    companyName: yup
        .string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters'),
    phone: yup.string().required('Phone is required'),
    country: yup.string().required('Country is required'),
    currency: yup.string().required('Currency is required'),
});

export default schema;
