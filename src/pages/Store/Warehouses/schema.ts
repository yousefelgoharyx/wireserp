import * as yup from 'yup';
const schema = yup.object().shape({
    warehouse_name: yup.string().required('Name is required'),
    branch_id: yup.string().required('Branch is required'),
});

export default schema;
