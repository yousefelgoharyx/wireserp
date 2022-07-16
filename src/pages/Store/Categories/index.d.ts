interface CategoryFormValues {
    category_name: string;
    type: string;
}
interface Category extends CategoryFormValues {
    id: number;
    company_id: number;
}

interface CategoryUpdate extends CategoryFormValues {
    cat_id: number;
}
type CategoryColumn = {
    header: string;
    selector: keyof Category;
};
