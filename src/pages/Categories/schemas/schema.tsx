import * as yup from 'yup';
const schema = yup.object().shape({
    category_name: yup.string().required('Name is required'),
    type: yup.string().required('Type is required'),
});

export default schema;
