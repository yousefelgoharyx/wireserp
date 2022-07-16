import * as yup from 'yup';
const productSchema = yup.object().shape({
    warehouse_id: yup.string().required('Warehouse is required'),
    warehouse_balance: yup.string().required('Warehouse balance is required'),
    barcode: yup.string().required('Barcode is required'),
    total_price: yup.string().required('Total price is required'),
    product_name: yup.string().required('Name is required'),
    product_unit: yup.string().required('Unit is required'),
    wholesale_price: yup.string().required('Wholesale price is required'),
    piece_price: yup.string().required('Piece price is required'),
    min_stock: yup.string(),
    product_model: yup.string(),
    category: yup.string().required('Category is required'),
    sub_category: yup.string().required('Sub category is required'),
    description: yup.string(),
    image: yup.object().shape({
        name: yup.string(),
    }),
});

export default productSchema;
