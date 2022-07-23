interface BankForm {
    bank_name: string;
    bank_balance: number;
}

interface Bank extends BankForm {
    id: number;
    company_id: number;
}

interface CashForm {
    bank_id: number;
    amount: number;
    type: 'withdraw' | 'deposit';
    notes: string;
}

interface Cash {
    id: number;
    process_type: string;
    bank_name: string;
    amount: number;
    notes: string;
    admin: string;
}

interface BankTransferForm {
    from_bank: number;
    to_bank: number;
    amount: number;
    notes: string;
}

interface BankTransfer {
    id: number;
    from_bank: string;
    to_bank: string;
    amount: number;
    notes: string;
    admin: string;
}

interface BankSafeTransferForm {
    safe_id: number;
    bank_id: number;
    amount: number;
    notes: string;
}

interface BankSafeTransfer {
    id: number;
    bank: string;
    safe: string;
    amount: number;
    notes: string;
    admin: string;
}
