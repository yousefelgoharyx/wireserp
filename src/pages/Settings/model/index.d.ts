interface GeneralForm {
  name: string;
  founder_name: string;
  business_field: string;
  address: string;
  phone: string;
  logo: File | string;
  stamp: File | string;
}
interface ExtraForm {
  currency: string;
  country: string;
}

interface FiscalYearForm {
  start_date: Date;
  end_date: Date;
  fiscal_year: number;
}

interface TaxesForm {
  tax_number: number;
  civil_registration_number: number;
  tax_value_added: number;
}
interface AllSettings {
  id: 32;
  name: string;
  phone: string;
  country: string;
  address: string;
  founder_name: string;
  business_field: string;
  currency: string;
  tax_number: number;
  civil_registration_number: number;
  tax_value_added: number;
  logo: string;
  company_stamp: string;
  status: string;
  fiscal_year: number;
  fiscal_start_date: string;
  fiscal_end_date: string;
}
