declare module 'categories' {
    interface CategoryFormValues {
        category_name: string;
        type: string;
    }
    interface Category extends CategoryFormValues {
        id: number;
        company_id: number;
    }

    type CategoryColumn = {
        header: string;
        selector: keyof Category;
    };

    type Context = {
        isRemoving: boolean;
        isCreating: boolean;
        isFetching: boolean;
        isUptading: boolean;
        data: Category[];
        remove: (id: number) => void;
        create: (branch: Category) => void;
        update: (branch: Category) => void;
        get: (id: number) => Category;
    };

    type ProivderProps = {
        children: React.ReactNode;
    };
}
