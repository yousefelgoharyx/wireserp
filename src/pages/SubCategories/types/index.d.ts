declare module 'subcategories' {
    import { Category } from 'categories';
    interface SubCategoryFormValues {
        category_id: number;
        sub_category_name: string;
    }
    interface SubCategory extends SubCategoryFormValues {
        id: number;
        company_id: number;
        category: Category;
    }

    type SubCategoryColumn = {
        header: string;
        selector: keyof SubCategory;
    };

    type Context = {
        isRemoving: boolean;
        isCreating: boolean;
        isFetching: boolean;
        isUptading: boolean;
        data: SubCategory[];
        categories: Category[];
        remove: (id: number) => void;
        create: (data: SubCategoryFormValues) => void;
        update: (data: SubCategory) => void;
        get: (id: number) => SubCategory;
    };

    type ProivderProps = {
        children: React.ReactNode;
    };
}
