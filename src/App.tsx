import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppProvider from './AppProvider';
import Layout from './Layout/Layout';
import { useAuth } from './AuthProvider';
import { FullSpinner } from './components/Spinner';
import Products from './pages/Store/Products/Products';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Signup = React.lazy(() => import('./pages/Signup/Signup'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));
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
                        <Route path="about" element={<About />} />

                        <Route path="settings">
                            <Route index element={<Settings />} />
                        </Route>
                        <Route path="branches">
                            <Route index element={<Branches />} />
                        </Route>

                        <Route path="products">
                            <Route index element={<Products />} />
                        </Route>
                        <Route path="categories">
                            <Route index element={<Cats />} />
                        </Route>
                        <Route path="sub-categories">
                            <Route index element={<SubCats />} />
                        </Route>
                        <Route path="warehouses">
                            <Route index element={<Warehouses />} />
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
