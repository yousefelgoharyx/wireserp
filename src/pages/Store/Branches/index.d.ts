interface BranchFormValues {
    branch_name: string;
    branch_phone: string;
    branch_address: string;
    commercial_registration_number: string;
}

interface Branch extends BranchFormValues {
    id: number;
    company_id: number;
}

interface BranchUpdate extends BranchFormValues {
    branch_id: number;
    company_id: number;
}

type BranchTable = Branch;
