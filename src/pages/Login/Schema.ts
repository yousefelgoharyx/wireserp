import * as yup from 'yup';
const schema = yup.object().shape({
    email: yup.string().email('Invalid e-mail'),
    password: yup.string().min(5, 'Password must be at least 5 characters'),
});

export default schema;
