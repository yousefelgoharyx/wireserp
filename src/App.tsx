import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppProvider from './AppProvider';
import Layout from './Layout/Layout';
import { useAuth } from './AuthProvider';
import { FullSpinner } from './components/Spinner';
import Invoice from './pages/Sales/Invoices/Invoice/Invoice';
import ViewInvoices from './pages/Sales/Invoices/ViewInvoices/ViewInvoices';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const Branches = lazy(() => import('./pages/Store/Branches/Branches'));
const Cats = lazy(() => import('./pages/Store/Cats/Cats'));
const SubCats = lazy(() => import('./pages/Store/SubCats/SubCats'));
const Warehouses = lazy(() => import('./pages/Store/Warehouses/Warehouses'));
const ProductsTable = lazy(
  () => import('./pages/Store/Products/ProductsTable')
);
const ProductsForm = lazy(() => import('./pages/Store/Products/ProductsForm'));
const Inventory = lazy(() => import('./pages/Store/Warehouses/Inventory'));
const Transfer = lazy(() => import('./pages/Store/Warehouses/Transfer'));
const Safes = lazy(() => import('./pages/Finance/Safes/Safes'));
const SafesTransfer = lazy(() => import('./pages/Finance/Safes/SafesTransfer'));
const Bank = lazy(() => import('./pages/Finance/Banks/Bank'));
const Cash = lazy(() => import('./pages/Finance/Banks/Cash'));
const Coupons = lazy(() => import('./pages/Coupons/Coupons'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const TransferBanks = lazy(() => import('./pages/Finance/Banks/TransferBanks'));
const TransferBankSafe = lazy(
  () => import('./pages/Finance/Banks/TransferBankSafe')
);
const TransferSafeBank = lazy(
  () => import('./pages/Finance/Banks/TransferSafeBank')
);

const ClientsForm = lazy(() => import('./pages/Debts/Clients/ClientsForm'));
const ClientsTable = lazy(() => import('./pages/Debts/Clients/ClientsTable'));
const SuppliersForm = lazy(
  () => import('./pages/Debts/Suppliers/SuppliersForm')
);
const SuppliersTable = lazy(
  () => import('./pages/Debts/Suppliers/SuppliersTable')
);

function App() {
  const { user } = useAuth();
  return (
    <AppProvider>
      {user ? (
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="branches">
              <Route index element={<Branches />} />
            </Route>

            <Route path="products">
              <Route index element={<ProductsTable />} />
              <Route path="add" element={<ProductsForm />} />
            </Route>
            <Route path="categories">
              <Route index element={<Cats />} />
            </Route>
            <Route path="sub-categories">
              <Route index element={<SubCats />} />
            </Route>
            <Route path="warehouses">
              <Route index element={<Warehouses />} />
              <Route path="transfer" element={<Transfer />} />
              <Route path="inventory" element={<Inventory />} />
            </Route>

            <Route path="clients">
              <Route index element={<ClientsTable />} />
              <Route path="create" element={<ClientsForm />} />
            </Route>

            <Route path="suppliers">
              <Route index element={<SuppliersTable />} />
              <Route path="create" element={<SuppliersForm />} />
            </Route>
            <Route path="safes">
              <Route index element={<Safes />} />
              <Route path="transfer" element={<SafesTransfer />} />
            </Route>

            <Route path="banks">
              <Route index element={<Bank />} />
              <Route path="activity" element={<Cash />} />
              <Route path="banks-transfer" element={<TransferBanks />} />
              <Route path="bank-to-safe" element={<TransferBankSafe />} />
              <Route path="safe-to-bank" element={<TransferSafeBank />} />
            </Route>
            <Route path="coupons" element={<Coupons />} />
            <Route path="invoices">
              <Route path="create" element={<Invoice />} />
              <Route path="all" element={<ViewInvoices />} />
            </Route>
            <Route path="settings">
              <Route index element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      ) : (
        <Suspense fallback={<FullSpinner />}>
          <Routes>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </Suspense>
      )}
    </AppProvider>
  );
}

export default App;
