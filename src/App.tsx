import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppProvider from './AppProvider';
import Layout from './Layout/Layout';
import { useAuth } from './AuthProvider';
import { FullSpinner } from './components/Spinner';
import Products from './pages/Products/Products';
import Categories from './pages/Categories/Categories';
import SubCategories from './pages/SubCategories/SubCategories';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Signup = React.lazy(() => import('./pages/Signup/Signup'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));
const Branches = React.lazy(() => import('./pages/Branches/Branches'));
const CreateBranch = React.lazy(() => import('./pages/Branches/CreateBranch'));

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
                            <Route index element={<Categories />} />
                        </Route>
                        <Route path="sub-categories">
                            <Route index element={<SubCategories />} />
                        </Route>
                        <Route path="*" element={<CreateBranch />} />
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
