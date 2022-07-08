import {
    Button,
    createStyles,
    Group,
    Paper,
    RingProgress,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import { Cash, Plus } from 'tabler-icons-react';
import Page from '../components/Page';
import Stat, { StatItem } from '../components/Stat';

const Home = () => {
    return (
        <Page>
            <Paper shadow="lg" withBorder p={16} radius="sm">
                <Group grow align="start">
                    <Stack justify="end" align="center">
                        <Title order={4}>Company profile completion rate</Title>
                        <RingProgress
                            roundCaps
                            size={164}
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
                        <Button size="xs" leftIcon={<Plus size={16} />}>
                            Complete the company information
                        </Button>
                    </Stack>
                </Group>
            </Paper>
            <Title my={16} order={2}>
                Stats
            </Title>
            <SimpleGrid
                breakpoints={[
                    { maxWidth: 'md', cols: 2 },
                    { maxWidth: 'xs', cols: 1 },
                ]}
                cols={3}
            >
                <Stat title="Net Externl Balance" icon={Cash}>
                    <StatItem title="Creditor" value="1" />
                    <StatItem title="Debtor" value="0" />
                    <Text color="dimmed">AED</Text>
                </Stat>

                <Stat title="Total dues to suppliers" icon={Cash}>
                    <StatItem title="Creditor" value="0" />
                    <StatItem title="Debtor" value="0" />
                    <Text color="dimmed">AED</Text>
                </Stat>
                <Stat title="Total customer debts" icon={Cash}>
                    <StatItem title="Creditor" value="1" />
                    <StatItem title="Debtor" value="0" />
                    <Text color="dimmed">AED</Text>
                </Stat>
                <Stat title="The total value of the merchandise" icon={Cash}>
                    <Text>996</Text>
                    <Text color="dimmed">AED</Text>
                </Stat>
                <Stat title="Total banks" icon={Cash}>
                    <Text>0</Text>
                    <Text color="dimmed">AED</Text>
                </Stat>
                <Stat title="Total storage" icon={Cash}>
                    <Text>-43</Text>
                    <Text color="dimmed">AED</Text>
                </Stat>
            </SimpleGrid>
        </Page>
    );
};

const useStyles = createStyles((theme) => ({}));

export default Home;
