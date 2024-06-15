import useItemsContext from "@/app/hooks/useItemsContext";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    SortingState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FaEdit, FaSortDown, FaSortUp, FaTrashAlt } from "react-icons/fa";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

type TTableProps = {};

type Items = {
    category: string;
    name: string;
    price: number;
    cost: number;
    options: string[];
    stock: number;
};

type Column = {
    accessorKey: string;
    header: string;
    enableSorting?: boolean;
    size: number;
};

const data: Items[] = [
    {
        category: "Appetizers",
        name: "Item 1",
        price: 10,
        cost: 5,
        options: ["small", "medium", "large"],
        stock: 20,
    },
    {
        category: "Main Dish",
        name: "Item 2",
        price: 15,
        cost: 8,
        options: ["small", "medium", "large"],
        stock: 15,
    },
    {
        category: "Appetizers",
        name: "Item 3",
        price: 20,
        cost: 10,
        options: ["small", "medium", "large"],
        stock: 10,
    },
    {
        category: "Main Dish",
        name: "Item 4",
        price: 25,
        cost: 12,
        options: ["small", "medium", "large"],
        stock: 5,
    },
    {
        category: "Desserts",
        name: "Item 5",
        price: 8,
        cost: 3,
        options: ["small", "medium", "large"],
        stock: 12,
    },
    {
        category: "Desserts",
        name: "Item 6",
        price: 12,
        cost: 6,
        options: ["small", "medium", "large"],
        stock: 8,
    },
    {
        category: "Drinks",
        name: "Item 7",
        price: 5,
        cost: 2,
        options: ["small", "medium", "large"],
        stock: 25,
    },
    {
        category: "Drinks",
        name: "Item 7",
        price: 5,
        cost: 2,
        options: ["small", "medium", "large"],
        stock: 25,
    },
    {
        category: "Drinks",
        name: "Item 7",
        price: 5,
        cost: 2,
        options: ["small", "medium", "large"],
        stock: 25,
    },
];

const columns: Column[] = [
    {
        accessorKey: "category",
        header: "Category",
        size: 300,
    },
    {
        accessorKey: "name",
        header: "Name",
        size: 400,
    },
    {
        accessorKey: "price",
        header: "price",
        size: 75,
    },
    {
        accessorKey: "cost",
        header: "cost",
        size: 75,
    },
    {
        accessorKey: "options",
        header: "options",
        enableSorting: false,
        size: 200,
    },
    {
        accessorKey: "stock",
        header: "Stock",
        size: 100,
    },
];

export default function Table({}: TTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const { test, setTest } = useItemsContext();

    useEffect(() => {
        console.log(test);
    }, [test]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            pagination,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    return (
        <div>
            <table className="bg-white rounded-lg shadow-md overflow-hidden">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="py-3 px-6 bg-teal text-white text-left text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors duration-300"
                                    style={{
                                        width: header.column.columnDef.size,
                                    }}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    <span className="inline-block">
                                        {header.column.getIsSorted() ? (
                                            header.column.getIsSorted() ===
                                            "desc" ? (
                                                <FaSortDown />
                                            ) : (
                                                <FaSortUp />
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="hover:bg-gray-100 transition-colors duration-200"
                        >
                            {row.getVisibleCells().map((cell, index) => (
                                <td
                                    key={cell.id}
                                    className={`py-3 px-6 border border-gray-200 text-sm text-gray-700 ${
                                        index ===
                                        row.getVisibleCells().length - 1
                                            ? "relative"
                                            : ""
                                    }`}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                    {index ===
                                        row.getVisibleCells().length - 1 && (
                                        <>
                                            <FaEdit className="absolute top-1/2 right-8  transform -translate-y-1/2 text-blue-500 cursor-pointer" />
                                            <FaTrashAlt className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-500 cursor-pointer" />
                                        </>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center items-center py-4 gap-10">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <GrFormPreviousLink />
                </button>

                <div className="text-sm text-gray-700">
                    Page{" "}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </div>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <GrFormNextLink />
                </button>
            </div>
        </div>
    );
}
