import * as yup from 'yup';
const schema = yup.object().shape({
    category_id: yup.string().required('Category is required'),
    sub_category_name: yup.string().required('Name is required'),
});

export default schema;
