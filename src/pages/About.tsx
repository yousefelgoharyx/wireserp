import {
    Button,
    Group,
    Input,
    InputWrapper,
    Text,
    TextInput,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FormShell from '../components/FormShell';
import Page from '../components/Page';

const About = () => {
    const { t } = useTranslation();

    return (
        <Page>
            <FormShell title={t('add', { text: t('product') })}>
                <Group grow>
                    <TextInput placeholder="Name" label="Full name" />
                    <TextInput placeholder="Name" label="Full name" />
                </Group>
            </FormShell>
            <Link to="/">
                <Button>{t('about')}</Button>
            </Link>
        </Page>
    );
};

export default About;
