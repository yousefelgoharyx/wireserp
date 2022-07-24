interface GeneralSettingsForm {
  name: string;
  founder_name: string;
  business_field: string;
  address: string;
  phone: string;
  logo: any;
  stamp: any;
}
interface ExtraSettingsForm {
  currency: string;
  country: string;
}

interface AllSettings {
  id: 32;
  name: string;
  phone: string;
  country: string;
  business_field: string;
  currency: string;
  tax_number: number;
  civil_registration_number: number;
  tax_value_added: number;
  logo: string;
  company_stamp: string;
  status: string;
  fiscal_year: number;
  fiscal_start_date: Date;
  fiscal_end_date: Date;
}
