import { Button, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Home = () => {
    const { t } = useTranslation();
    return (
        <div>
            <Link to="/about">
                <Button> {t('home')}</Button>
            </Link>
        </div>
    );
};

export default Home;
