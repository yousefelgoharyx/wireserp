import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './Layout/Layout';
import AppProvider from './AppProvider';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './translations/ar.json';
import en from './translations/en.json';
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
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </AppProvider>
    );
}

export default App;
