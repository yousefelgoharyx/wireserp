import * as yup from 'yup';

export const step1Keys = ['companyName', 'companyPhone', 'country', 'currency'];
export const step2Keys = ['fiscalYear', 'startDate', 'endDate'];
export const step3Keys = ['name', 'phone', 'email', 'password'];

export const initialValues = {
    companyName: '',
    companyPhone: '',
    country: '',
    currency: '',
    fiscalYear: '',
    startDate: '',
    endDate: '',
    name: '',
    phone: '',
    email: '',
    password: '',
};
export const stepsSchema = yup.object().shape({
    companyName: yup
        .string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters'),
    companyPhone: yup
        .number()
        .typeError('Phone is required')
        .required('Phone is required'),
    country: yup.string().required('Country is required'),
    currency: yup.string().required('Currency is required'),
    fiscalYear: yup
        .number()
        .typeError('This field is required')
        .required('This field is required'),
    startDate: yup
        .date()
        .typeError('Choose a date')
        .required('This field is required'),
    endDate: yup
        .date()
        .typeError('Choose a date')
        .required('This field is required'),
    name: yup
        .string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters'),
    phone: yup
        .number()
        .typeError('Phone is required')
        .required('Phone is required'),
    email: yup.string().required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password at least should 8 characters long')
        .max(28, "Password can't be larger that 28 characters"),
});
