declare module 'branches' {
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

    type BranchColumn = {
        header: string;
        selector: keyof Branch;
    };

    type Context = {
        isRemoving: boolean;
        isCreating: boolean;
        isFetching: boolean;
        isUptading: boolean;
        branches: Branch[];
        remove: (id: number) => void;
        create: (branch: Branch) => void;
        update: (branch: Branch) => void;
        get: (id: number) => Branch;
    };

    type ProivderProps = {
        children: React.ReactNode;
    };
}
