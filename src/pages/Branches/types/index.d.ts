declare module 'branches' {
    type BranchForm = {
        branch_name: string;
        branch_phone: string;
        branch_address: string;
        commercial_registration_number: string;
    };
    type Branch = {
        id: number;
        branch_name: string;
        branch_phone: string;
        branch_address: string;
        commercial_registration_number: string;
        company_id: number;
    };

    type BranchColumn = {
        header: string;
        selector: keyof BranchTable;
    };

    type BranchesContextType = {
        isDeleting: boolean;
        isCreating: boolean;
        isFetching: boolean;
        isUptading: boolean;
        branches: BranchTable[];
        deleteBranch: (id: number) => void;
        createBranch: (branch: Branch) => void;
        updateBranch: (branch: Branch) => void;
        getBranch: (id: number) => BranchTable;
    };
}
