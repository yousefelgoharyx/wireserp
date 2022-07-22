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
