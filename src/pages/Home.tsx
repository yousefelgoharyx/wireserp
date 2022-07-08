import {
    Box,
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
import { Cash, Edit, Plus } from 'tabler-icons-react';
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
                    { maxWidth: 'lg', cols: 2 },
                    { maxWidth: 'md', cols: 1 },
                    { maxWidth: 'sm', cols: 3 },
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

            <Title my={16} order={2}>
                Shortcuts
            </Title>
            <SimpleGrid
                breakpoints={[
                    { maxWidth: 'lg', cols: 2 },
                    { maxWidth: 'md', cols: 1 },
                    { maxWidth: 'sm', cols: 2 },
                    { maxWidth: 'xs', cols: 1 },
                ]}
                cols={3}
            >
                <Stack spacing={8}>
                    <Paper p={12} shadow="sm">
                        <Group spacing={8} align="center">
                            <Plus />
                            <Text weight={700}>Add</Text>
                        </Group>
                    </Paper>
                    <Paper p={16} shadow="sm">
                        <SimpleGrid cols={1}>
                            <Button uppercase>Add category</Button>
                            <Button uppercase>Add product</Button>
                            <Button uppercase>Add customer</Button>
                            <Button uppercase>Add supplier</Button>
                            <Button uppercase>Add employee</Button>
                        </SimpleGrid>
                    </Paper>
                </Stack>

                <Stack spacing={8}>
                    <Paper p={12} shadow="sm">
                        <Group spacing={8} align="center">
                            <Cash />
                            <Text weight={700}>Pay</Text>
                        </Group>
                    </Paper>
                    <Paper p={16} shadow="sm">
                        <SimpleGrid cols={1}>
                            <Button uppercase>
                                Case payment to a supplier
                            </Button>
                            <Button uppercase>
                                Cash payment to a customer
                            </Button>
                            <Button uppercase>
                                Cash payment to an employee
                            </Button>
                        </SimpleGrid>
                    </Paper>
                </Stack>

                <Stack spacing={8}>
                    <Paper p={12} shadow="sm">
                        <Group spacing={8} align="center">
                            <Edit />
                            <Text weight={700}>Record</Text>
                        </Group>
                    </Paper>
                    <Paper p={16} shadow="sm">
                        <SimpleGrid cols={1}>
                            <Button uppercase>
                                Batch registeration from a client
                            </Button>
                            <Button uppercase>
                                Batch registeration from a supplier
                            </Button>
                            <Button uppercase>Record expense</Button>
                        </SimpleGrid>
                    </Paper>
                </Stack>
            </SimpleGrid>
        </Page>
    );
};

export default Home;
