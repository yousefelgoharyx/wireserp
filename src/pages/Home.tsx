import {
    Center,
    Group,
    Paper,
    RingProgress,
    Text,
    ThemeIcon,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import Page from '../components/Page';
import { Check, X } from 'tabler-icons-react';
const Home = () => {
    const { t } = useTranslation();
    return (
        <Page>
            <Paper shadow="lg" withBorder p={16} radius="sm">
                <Group>
                    <RingProgress
                        sections={[{ value: 40, color: 'teal' }]}
                        label={
                            <Text
                                color="teal"
                                weight={700}
                                align="center"
                                size="xl"
                            >
                                40%
                            </Text>
                        }
                    />
                    <RingProgress
                        sections={[{ value: 100, color: 'teal' }]}
                        label={
                            <Center>
                                <ThemeIcon
                                    color="teal"
                                    variant="light"
                                    radius="xl"
                                    size="xl"
                                >
                                    <Check size={22} />
                                </ThemeIcon>
                            </Center>
                        }
                    />
                </Group>
            </Paper>
        </Page>
    );
};

export default Home;
