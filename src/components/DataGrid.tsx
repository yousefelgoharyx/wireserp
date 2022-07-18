import { Group, Pagination, Paper, ScrollArea, Table } from '@mantine/core';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useRef } from 'react';

interface DataGridProps {
    data: any[];
    columns: ColumnDef<any>[];
}

const DataGrid = (props: DataGridProps) => {
    const pageIndex = useRef<number>(0);
    const table = useReactTable({
        data: props.data,
        columns: props.columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
        defaultColumn: {
            size: 150,
            maxSize: 700,
        },
    });
    let pageCount = table.getPageCount();
    if (table.getRowModel().rows.length > 0) {
        if (pageIndex.current !== table.getState().pagination.pageIndex) {
            table.setPageIndex(pageIndex.current);
        }

        if (pageIndex.current + 1 > pageCount) {
            pageIndex.current = pageCount - 1;
            table.setPageIndex(pageCount - 1);
        }
    }

    return (
        <>
            <Paper>
                <ScrollArea>
                    <Table striped verticalSpacing="md" horizontalSpacing="md">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr
                                    style={{ display: 'flex', flex: 1 }}
                                    key={headerGroup.id}
                                >
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            {...{
                                                key: header.id,
                                                colSpan: header.colSpan,
                                                style: {
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    flex: 1,
                                                    width:
                                                        header.column.id ===
                                                        'id'
                                                            ? 50
                                                            : header.column.getSize(),
                                                },
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => {
                                return (
                                    <tr
                                        style={{ display: 'flex', flex: 1 }}
                                        key={row.id}
                                    >
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td
                                                    {...{
                                                        key: cell.id,
                                                        style: {
                                                            width:
                                                                cell.column
                                                                    .id === 'id'
                                                                    ? 50
                                                                    : cell.column.getSize(),
                                                            overflow: 'hidden',
                                                            textOverflow:
                                                                'ellipsis',
                                                            flex: 1,
                                                        },
                                                    }}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </ScrollArea>
            </Paper>
            <Group>
                {table.getRowModel().rows.length > 0 && (
                    <Pagination
                        page={table.getState().pagination.pageIndex + 1}
                        onChange={(x) => {
                            table.setPageIndex(x - 1);
                            pageIndex.current = x - 1;
                        }}
                        total={table.getPageCount()}
                    />
                )}
            </Group>
        </>
    );
};

export default DataGrid;
