interface SafeFormValues {
    safe_name: string;
    branch_id: number;
    safe_balance: number;
    safe_type: string;
}

interface Safe extends SafeFormValues {
    id: number;
    company_id: number;
    branch: string;
}

interface SafeTransferFormValues {
    from_safe: number;
    to_safe: number;
    amount: number;
    notes: string;
}

interface SafeTransfer extends SafeTransferFormValues {
    id: number;
    company_id: number;
    from_safe: string;
    to_safe: string;
}
