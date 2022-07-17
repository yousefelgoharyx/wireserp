interface ProductFormValues {
    warehouse_id: number;
    warehouse_balance: number;
    barcode: number; // barcode 9 numbers
    total_price: number;
    product_name: string;
    product_unit: Unit;
    wholesale_price: number;
    piece_price: number;
    min_stock: number; // not required
    product_model: string; // not required
    category: number;
    sub_category: number;
    description: string; // not required
    image?: File | string; // not required
}

interface Product extends ProductFormValues {
    id: number;
    company_id: number;
}

interface ProductUpdate extends ProductFormValues {
    product_id: number;
}

type ProductTable = {
    id: number;
    warehouse: string;
    warehouse_balance: number;
    barcode: number; // barcode 9 numbers
    total_price: number;
    product_name: string;
    product_unit: Unit;
    wholesale_price: number;
    piece_price: number;
    min_stock: number; // not required
    product_model: string; // not required
    category: string;
    sub_category: string;
    description: string; // not required
    image?: File | string; // not required
};
