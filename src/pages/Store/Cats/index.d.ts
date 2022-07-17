interface CategoryFormValues {
    category_name: string;
    type: string;
}
interface Category extends CategoryFormValues {
    company_id: number;
    id: number;
}

interface CategoryUpdate extends CategoryFormValues {
    cat_id: number;
}

interface CategoryTable extends CategoryFormValues {
    id: number;
}
