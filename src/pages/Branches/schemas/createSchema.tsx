import * as yup from 'yup';
const createSchema = yup.object().shape({
    branch_name: yup.string().required('Name is required'),
    branch_phone: yup.string().required('Phone is required'),
    branch_address: yup.string().required('Address is required'),
    commercial_registration_number: yup.string(),
});

export default createSchema;
