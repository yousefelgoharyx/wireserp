import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppProvider from './AppProvider';
import Layout from './Layout/Layout';
import { useAuth } from './AuthProvider';
import { FullSpinner } from './components/Spinner';
import Products from './pages/Store/Products/Products';
import ProductsTable from './pages/Store/Products/ProductsTable';
import ProductsForm from './pages/Store/Products/ProductsForm';
import Transfer from './pages/Store/Warehouses/Transfer';
import Inventory from './pages/Store/Warehouses/Inventory';
import ClientsForm from './pages/Debts/Clients/ClientsForm';
import ClientsTable from './pages/Debts/Clients/ClientsTable';
import SuppliersTable from './pages/Debts/Suppliers/SuppliersTable';
import SuppliersForm from './pages/Debts/Suppliers/SuppliersForm';
import Safes from './pages/Finance/Safes/Safes';
import SafesTransfer from './pages/Finance/Safes/SafesTransfer';
import BankAdd from './pages/Finance/Banks/BankAdd';
import Bank from './pages/Finance/Banks/Bank';
import Cash from './pages/Finance/Banks/Cash';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Signup = React.lazy(() => import('./pages/Signup/Signup'));
const Branches = React.lazy(() => import('./pages/Store/Branches/Branches'));
const Cats = React.lazy(() => import('./pages/Store/Cats/Cats'));
const SubCats = React.lazy(() => import('./pages/Store/SubCats/SubCats'));
const Warehouses = React.lazy(
    () => import('./pages/Store/Warehouses/Warehouses')
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
                            <Route
                                path="transfer"
                                element={<SafesTransfer />}
                            />
                        </Route>

                        <Route path="banks">
                            <Route index element={<Bank />} />
                            <Route path="activity" element={<Cash />} />
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
