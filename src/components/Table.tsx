import { createStyles, Table, ScrollArea } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    rowSelected: {
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
                : theme.colors[theme.primaryColor][0],
    },
    tr: {
        display: 'flex',
    },
    th: {
        flex: '1 0 auto',
    },
}));

interface TableSelectionProps {
    data: any[];
    columns: any[];
    actions: any[];
}

export default function TableSelection(props: TableSelectionProps) {
    const { data, columns, actions } = props;
    const { classes } = useStyles();
    const rows = data.map((item) => {
        return (
            <tr key={item.id}>
                {columns.map((column) => {
                    let value;
                    const props = column.selector.split('.');
                    props.forEach((prop) => {
                        value = value ? value[prop] : item[prop];
                    });
                    return <td key={column.selector}>{value}</td>;
                })}
                {actions.map((action, i) => (
                    <td key={i}>{action.cell(item)}</td>
                ))}
            </tr>
        );
    });

    return (
        <ScrollArea>
            <Table
                striped
                horizontalSpacing="md"
                sx={{ minWidth: 800 }}
                verticalSpacing="md"
            >
                <thead>
                    <tr className={classes.tr}>
                        {columns.map((col) => (
                            <th className={classes.th} key={col.selector}>
                                {col.header}
                            </th>
                        ))}
                        <th className={classes.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}
