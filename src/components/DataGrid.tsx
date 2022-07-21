import {
    Group,
    Pagination,
    Paper,
    ScrollArea,
    Table,
    TextInput,
} from '@mantine/core';
import {
    ColumnDef,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useRef, useState } from 'react';
import { SortAscending, SortDescending } from 'tabler-icons-react';

interface DataGridProps {
    data: any[];
    columns: ColumnDef<any>[];
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
};

const DataGrid = (props: DataGridProps) => {
    const pageIndex = useRef<number>(0);
    const [globalFilter, setGlobalFilter] = useState('');
    const table = useReactTable({
        data: props.data,
        columns: props.columns,
        state: {
            globalFilter,
        },
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        initialState: {
            pagination: {
                pageSize: 5,
            },
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
            <Group grow style={{ maxWidth: 320 }}>
                <TextInput
                    placeholder="Search..."
                    value={globalFilter ?? ''}
                    onChange={(e) => setGlobalFilter(String(e.target.value))}
                />
            </Group>
            <Paper>
                <ScrollArea>
                    <Table striped verticalSpacing="md" horizontalSpacing="md">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            style={{ width: header.getSize() }}
                                        >
                                            <Group
                                                style={{
                                                    cursor: 'pointer',
                                                    userSelect: 'none',
                                                }}
                                                grow
                                                align="flex-start"
                                                position="apart"
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                                {{
                                                    asc: (
                                                        <SortAscending
                                                            size={20}
                                                        />
                                                    ),
                                                    desc: (
                                                        <SortDescending
                                                            size={20}
                                                        />
                                                    ),
                                                }[
                                                    header.column.getIsSorted() as string
                                                ] ?? null}
                                            </Group>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => {
                                return (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    style={{
                                                        width: cell.column.getSize(),
                                                    }}
                                                >
                                                    <div>
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </div>
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
