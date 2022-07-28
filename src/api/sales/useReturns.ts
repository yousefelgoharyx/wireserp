import usePost from '../../hooks/usePost';
import useRead from '../../hooks/useRead';

const useReturnsQuery = () => {
  const { data } = useRead<Return[]>(['returns'], '/return-invoice');

  return {
    data,
  };
};

const useReturnsMutation = () => {
  const { post: returnProduct, isPosting: isReturning } =
    usePost<ReturnProductForm>(['invoices', 'returns'], '/return-invoice');
  return {
    returnProduct,
    isReturning,
  };
};

export { useReturnsQuery, useReturnsMutation };
