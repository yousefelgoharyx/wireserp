interface ClientForm {
  c_name: string;
  releated_user: string;
  indebt_type: string;
  indebt_amount: number;
  c_phone: string;
  c_address: string;
  c_notes: string;
  deal_type: string;
  c_email: string;
  c_company: string;
  c_nationality: string;
  c_tax_number: number;
}

interface Client extends ClientForm {
  id: number;
}
