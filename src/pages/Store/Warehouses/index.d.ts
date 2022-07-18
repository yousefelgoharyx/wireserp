interface WarehouseFormValues {
    warehouse_name: string;
    branch_id: number;
}
interface Warehouse extends WarehouseFormValues {
    company_id: number;
    id: number;
}

interface WarehouseTable {
    id: number;
    warehouse_name: string;
    branch: string;
}

type WarehouseColumn = {
    header: string;
    selector: keyof Warehouse;
};

interface TransferFormValues {
    from_warehouse: string;
    to_warehouse: string;
    product_id: string;
    date: Date;
    notes: string;
    quantity: number;
}

interface KosomAhmedIbrahim extends Omit<TransferFormValues, 'date'> {
    date: string;
}

interface InventoryFormValues {
    warehouse_id: number;
    from: Date;
    to: Date;
}
interface TransferItem {
    id: number;
    from_warehouse: string;
    to_warehouse: string;
    product_name: string;
    quantity: number;
    date: string;
    notes: string;
}

interface InventoryItem {
    id: number;
    barcode: number;
    total_price: 40;
    warehouse_balance: number;
    salings: number;
    buyings: number;
}
