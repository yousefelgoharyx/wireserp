import * as yup from 'yup';
const schema: yup.SchemaOf<SafeFormValues> = yup.object().shape({
    safe_name: yup.string().required('Name is required'),
    branch_id: yup.number().typeError('Select a branch').required(),
    safe_balance: yup.number().required('Balance is required'),
    safe_type: yup.string().required('Type is required'),
});

export const transferSchema: yup.SchemaOf<SafeTransferFormValues> = yup
    .object()
    .shape({
        from_safe_id: yup
            .number()
            .typeError('Select from safe')
            .required('From safe is required'),
        to_safe_id: yup
            .number()
            .typeError('Select to safe')
            .required('To safe is required'),
        amount: yup.number().required('Amount is required'),
        notes: yup.string().required('Notes is required'),
    });
export default schema;
