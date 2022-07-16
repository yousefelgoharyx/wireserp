declare module 'products' {
    type Unit = 'unit' | 'gm' | 'kg' | 'ton';
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
        image: File; // not required
    }

    interface Product extends ProductFormValues {
        id: number;
        company_id: number;
    }

    type ProductColumn = {
        header: string;
        selector: keyof Product;
    };

    type Context = {
        isRemoving: boolean;
        isCreating: boolean;
        isFetching: boolean;
        isUptading: boolean;
        products: Product[];
        remove: (id: number) => void;
        create: (branch: ProductFormValues) => void;
        update: (branch: Product) => void;
        get: (id: number) => Product;
    };

    type ProivderProps = {
        children: React.ReactNode;
    };
}
