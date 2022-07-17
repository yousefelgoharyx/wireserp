import * as yup from 'yup';
const schema = yup.object().shape({
    sub_category_name: yup.string().required('Name is required'),
    category_id: yup.string().required('Type is required'),
});

export default schema;
