import * as yup from 'yup';
const schema = yup.object().shape({
    name: yup
        .string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters'),
    email: yup.string().required('Email is required').email('Invalid e-mail'),
    password: yup
        .string()
        .required()
        .min(5, 'Password must be at least 5 characters'),
});

export default schema;
