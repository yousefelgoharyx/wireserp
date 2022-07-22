import * as yup from 'yup';

export const BankAddSchema: yup.SchemaOf<BankForm> = yup.object().shape({
    bank_name: yup.string().required('Name is required'),
    bank_balance: yup.number().required('Balance is required'),
});
