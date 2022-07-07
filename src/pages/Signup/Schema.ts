import dayjs from 'dayjs';
import * as yup from 'yup';

export const step1Keys = ['companyName', 'companyPhone', 'country', 'currency'];
export const step2Keys = ['fiscalYear', 'startDate', 'endDate'];
export const step3Keys = ['name', 'phone', 'email', 'password'];

export const initialValues = {
    company_name: '',
    company_phone: '',
    company_country: '',
    company_currency: '',
    fiscal_year: dayjs().get('year'),
    fiscal_start_date: dayjs().startOf('year').toDate(),
    fiscal_end_date: dayjs().endOf('year').toDate(),
    manager_name: '',
    manager_phone: '',
    manager_email: '',
    manager_password: '',
};
console.log(initialValues);

export const stepsSchema = yup.object().shape({
    company_name: yup
        .string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters'),
    company_phone: yup
        .number()
        .typeError('Phone is required')
        .required('Phone is required'),
    company_country: yup.string().required('Country is required'),
    company_currency: yup.string().required('Currency is required'),
    fiscal_year: yup
        .number()
        .typeError('This field is required')
        .required('This field is required'),
    fiscal_start_date: yup
        .date()
        .typeError('Choose a date')
        .required('This field is required'),
    fiscal_end_date: yup
        .date()
        .typeError('Choose a date')
        .required('This field is required'),
    manager_name: yup
        .string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters'),
    manager_phone: yup
        .number()
        .typeError('Phone is required')
        .required('Phone is required'),
    manager_email: yup.string().required('Email is required'),
    manager_password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password at least should 8 characters long')
        .max(28, "Password can't be larger that 28 characters"),
});
