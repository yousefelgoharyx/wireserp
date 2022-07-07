import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './Layout/Layout';
import AppProvider from './AppProvider';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Settings from './pages/Settings/Settings';
import Branches from './pages/Branches/Branches';
import CreateBranch from './pages/Branches/CreateBranch';
import { useAuth } from './AuthProvider';
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
                            <Route path="create" element={<CreateBranch />} />
                        </Route>
                        <Route path="*" element={<CreateBranch />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Routes>
            ) : (
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Routes>
            )}
        </AppProvider>
    );
}

export default App;
