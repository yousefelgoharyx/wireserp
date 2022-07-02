import { Button, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const About = () => {
    const { t } = useTranslation();

    return (
        <div>
            <Link to="/">
                <Button>{t('about')}</Button>
            </Link>
        </div>
    );
};

export default About;
