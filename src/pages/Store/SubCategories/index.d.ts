interface SubCategoryFormValues {
    category_id: number;
    sub_category_name: string;
}
interface SubCategory extends SubCategoryFormValues {
    id: number;
    company_id: number;
    category: Category;
}

interface SubCategoryUpdate extends SubCategoryFormValues {
    sub_cat_id: number;
}

type SubCategoryColumn = {
    header: string;
    selector: keyof SubCategory;
};
