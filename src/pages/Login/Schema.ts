import * as yup from 'yup';
const schema = yup.object().shape({
    email: yup.string().required('E-mail is required').email('Invalid e-mail'),
    password: yup
        .string()
        .required('Password is required')
        .min(5, 'Password must be at least 5 characters'),
});

export default schema;
