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
