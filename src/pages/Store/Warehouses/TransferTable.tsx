import useTransfer from '../../../api/useTransfer';
import DataGrid from '../../../components/DataGrid';
import { transferListCols } from './columns';

const TransferTable = () => {
    const { data } = useTransfer();
    return <DataGrid columns={transferListCols} data={data} />;
};

export default TransferTable;
