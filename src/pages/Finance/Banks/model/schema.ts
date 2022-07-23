import * as yup from 'yup';

export const BankAddSchema: yup.SchemaOf<BankForm> = yup.object().shape({
    bank_name: yup.string().required('Name is required'),
    bank_balance: yup.number().required('Balance is required'),
});

export const CashAddSchema: yup.SchemaOf<CashForm> = yup.object().shape({
    bank_id: yup
        .number()
        .typeError('Please select a bank')
        .required('Bank is required is required'),
    amount: yup.number().required('Amount is required'),
    type: yup
        .mixed()
        .oneOf(['withdraw', 'deposit'])
        .required('Type is required'),
    notes: yup.string().required('Notes is required'),
});

export const BankTransferSchema: yup.SchemaOf<BankTransferForm> = yup
    .object()
    .shape({
        from_bank: yup
            .number()
            .typeError('Please select a bank')
            .required('Bank is required is required'),
        to_bank: yup
            .number()
            .typeError('Please select a bank')
            .required('Bank is required is required'),
        amount: yup.number().required('Amount is required'),

        notes: yup.string().required('Notes is required'),
    });

export const BankSafeTransferSchema: yup.SchemaOf<BankSafeTransferForm> = yup
    .object()
    .shape({
        bank_id: yup
            .number()
            .typeError('Please select a bank')
            .required('Bank is required is required'),
        safe_id: yup
            .number()
            .typeError('Please select a bank')
            .required('Bank is required is required'),
        amount: yup.number().required('Amount is required'),

        notes: yup.string().required('Notes is required'),
    });
