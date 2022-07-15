declare module 'branches' {
    type Branch = {
        branch_name: string;
        branch_phone: string;
        branch_address: string;
        commercial_registration_number: string;
    };
    type BranchTable = {
        id: number;
        branch_name: string;
        branch_phone: string;
        branch_address: string;
        commercial_registration_number: string;
    };

    type BranchColumn = {
        header: string;
        selector: keyof BranchTable;
    };
}
