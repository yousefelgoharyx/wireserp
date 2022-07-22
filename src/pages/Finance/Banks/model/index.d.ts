interface BankForm {
    bank_name: string;
    bank_balance: number;
}

interface Bank extends BankForm {
    id: number;
    company_id: number;
}
