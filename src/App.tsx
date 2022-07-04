import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './Layout/Layout';
import AppProvider from './AppProvider';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './translations/ar.json';
import en from './translations/en.json';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Settings from './pages/Settings/Settings';
import Branches from './pages/Branches/Branches';
import CreateBranch from './pages/Branches/CreateBranch';
const resources = {
    en: {
        translation: en,
    },
    ar: {
        translation: ar,
    },
};
i18n.use(initReactI18next).init({
    resources,
    lng: 'ar',
    fallbackLng: 'ar',
});
function App() {
    return (
        <AppProvider>
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
        </AppProvider>
    );
}

export default App;
