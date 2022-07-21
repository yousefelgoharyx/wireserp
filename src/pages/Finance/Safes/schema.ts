import * as yup from 'yup';
const schema: yup.SchemaOf<SafeFormValues> = yup.object().shape({
    safe_name: yup.string().required('Name is required'),
    branch_id: yup.number().typeError('Select a branch').nullable(),
    safe_balance: yup.number().required('Balance is required'),
    safe_type: yup.string().required('Type is required'),
});

export default schema;
