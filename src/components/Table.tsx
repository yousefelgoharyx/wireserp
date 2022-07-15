import React, { useState } from 'react';
import {
    createStyles,
    Table,
    Checkbox,
    ScrollArea,
    Group,
    Avatar,
    Text,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    rowSelected: {
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
                : theme.colors[theme.primaryColor][0],
    },
}));

interface TableSelectionProps {
    data: any[];
    columns: any[];
    actions: any[];
}

export default function TableSelection(props: TableSelectionProps) {
    const { data, columns, actions } = props;

    const rows = data.map((item) => {
        return (
            <tr key={item.id}>
                {columns.map((column) => (
                    <td>{item[column.selector]}</td>
                ))}
                {actions.map((action) => (
                    <td>{action.cell(item)}</td>
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
                    <tr>
                        {columns.map((col) => (
                            <th>{col.header}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}
