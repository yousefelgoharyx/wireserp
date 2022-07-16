interface WarehouseFormValues {
    warehouse_name: string;
    branch_id: number;
}
interface Warehouse extends WarehouseFormValues {
    company_id: number;
    id: number;
}
