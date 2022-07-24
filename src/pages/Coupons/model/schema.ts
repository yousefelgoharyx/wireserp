import * as yup from 'yup';

export const CouponFormSchema: yup.SchemaOf<CouponForm> = yup.object().shape({
    code: yup.string().required('Code is required'),
    discount: yup.number().required('Discount is required'),
    expire_date: yup
        .date()
        .typeError('Select a date')
        .required('Expire date is required'),
    section: yup
        .mixed()
        .oneOf(['clients', 'products', 'categories'])
        .required('Section is required'),
    item_id: yup
        .number()
        .typeError('Select an item')
        .required('Select an item'),
});
