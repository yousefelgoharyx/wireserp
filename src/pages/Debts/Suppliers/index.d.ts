interface SupplierFormValues {
    s_name: string;
    indebt_type: string;
    indebt_amount: number;
    s_phone: string;
    s_address: string;
    s_notes: string;
    deal_type: string;
    s_email: string;
    s_company: string;
    s_nationality: string;
    s_tax_number: number;
}

type DealType = 'piece' | 'wholesale';

interface Supplier extends SupplierFormValues {
    id: number;
}
