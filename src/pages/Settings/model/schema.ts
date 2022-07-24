import * as yup from 'yup';
export const GeneralSettingsSchema: yup.SchemaOf<GeneralSettingsForm> = yup
  .object()
  .shape({
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

export const ExtraSettingsSchema: yup.SchemaOf<ExtraSettingsForm> = yup
  .object()
  .shape({
    currency: yup.string().required('Currency is required'),
    country: yup.string().required('Country is required'),
  });
