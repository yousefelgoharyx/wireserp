import * as yup from 'yup';
export const GeneralSchema: yup.SchemaOf<GeneralForm> = yup.object().shape({
  name: yup.string().required('Name is required'),
  business_field: yup.string().required('Field is required'),
  founder_name: yup.string().required('Founder name is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required('Address is required'),
  logo: yup.mixed().test('file', 'Select an image', function (v: any) {
    return v instanceof File;
  }),
  stamp: yup.mixed().test('file', 'Select an image', function (v: any) {
    return v instanceof File;
  }),
});

export const ExtraSchema: yup.SchemaOf<ExtraForm> = yup.object().shape({
  currency: yup.string().required('Currency is required'),
  country: yup.string().required('Country is required'),
});

export const FiscalYearSchema: yup.SchemaOf<FiscalYearForm> = yup
  .object()
  .shape({
    fiscal_year: yup.number().required('Fiscal year is required'),
    start_date: yup
      .date()
      .typeError('Select a date')
      .required('Start date is required'),
    end_date: yup
      .date()
      .typeError('Select a date')
      .required('End date is required'),
  });

export const TaxesSchema: yup.SchemaOf<TaxesForm> = yup.object().shape({
  tax_number: yup.number().required('Fiscal year is required'),
  civil_registration_number: yup
    .number()
    .required('Registeration number is required'),
  tax_value_added: yup.number().required('Tax value added is required'),
});
