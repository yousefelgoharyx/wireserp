import { SelectItem } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import instance from '../../utils/axios';

async function fetcher() {
  const response = await instance.post<Product[]>('/products');
  return response.data;
}

function deleteCategory(id: number) {
  return instance.post('/delete-product', { product_id: id });
}

function createCategory(cat: FormData) {
  return instance.post('/add-product', cat);
}

function updateCategory(cat: ProductUpdate) {
  return instance.post('/edit-product', cat);
}

const useProducts = () => {
  const queryClient = useQueryClient();
  const query = useQuery('products', fetcher);

  const options = {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  };
  const deleteOwner = useMutation(deleteCategory, options);
  const createOwner = useMutation(createCategory, options);
  const updateOwner = useMutation(updateCategory, options);

  return {
    ...query,
    remove: deleteOwner.mutateAsync,
    isRemoving: deleteOwner.isLoading,
    create: createOwner.mutateAsync,
    isCreating: createOwner.isLoading,
    update: updateOwner.mutateAsync,
    isUpdating: updateOwner.isLoading,
  };
};

export const useProductsList = () => {
  return useQuery('products', fetcher);
};

export function productsToSelectItems(products: Product[]): SelectItem[] {
  return products.map(
    (product): SelectItem => ({
      label: product.product_name,
      value: product.id.toString(),
    })
  );
}
export default useProducts;
