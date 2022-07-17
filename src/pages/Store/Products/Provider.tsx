import { showNotification } from '@mantine/notifications';
import React, { useContext } from 'react';
import getApiError from '../../../utils/getApiError';
import instance from '../../../utils/axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const ProductsContext = React.createContext<Context<Product>>(null);

// Handlers
function updateHandler(product: Product) {
    return instance.post('/edit-product', product);
}
function createHanlder(product: ProductFormValues) {
    return instance.post('/add-product', product);
}

function deleteHandler(id: number) {
    return instance.post('/delete-product', {
        product_id: id,
    });
}
async function readHandler() {
    const response = await instance.post<Product[]>('/products');
    return response.data;
}

const ProductsProvider = (props: ProivderProps) => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries(['products']);
    const mutationOptions = { onSuccess: invalidate };

    const query = useQuery('products', readHandler);
    const createOwner = useMutation(createHanlder, mutationOptions);
    const updateOwner = useMutation(updateHandler, mutationOptions);
    const deleteOwner = useMutation(deleteHandler, mutationOptions);
    const { data: products, isFetching } = query;

    const create = async (product: Product) => {
        console.log('create', product);

        try {
            await createOwner.mutateAsync(product);
            showNotification({
                title: 'Success',
                message: 'Added Product successfully',
            });
        } catch (error) {
            showNotification({
                title: 'Something went wrong!',
                message: getApiError(error.response.data),
                color: 'red',
            });
        }
    };

    const update = async (product: Product) => {
        // TODO
        // const newBranch = { ...branch, branch_id: branch.id };
        // delete newBranch.id;
        // try {
        //     await updateOwner.mutateAsync(newBranch);
        //     showNotification({
        //         title: 'Success',
        //         message: 'Updated branch successfully',
        //     });
        // } catch (error) {
        //     showNotification({
        //         title: 'Something went wrong!',
        //         message: getApiError(error.response.data),
        //         color: 'red',
        //     });
        // }
    };
    async function remove(id: number) {
        try {
            await deleteOwner.mutateAsync(id);
            showNotification({
                title: 'Success',
                message: 'Deleted branch successfully',
            });
        } catch (error) {
            showNotification({
                title: 'Something went wrong!',
                message: getApiError(error.response.data),
                color: 'red',
            });
        }
    }

    return (
        <ProductsContext.Provider
            value={{
                data: products,
                isCreating: createOwner.isLoading,
                isRemoving: deleteOwner.isLoading,
                isUptading: updateOwner.isLoading,
                remove,
                create,
                update,
                isFetching,
            }}
        >
            {props.children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);
export default ProductsProvider;
