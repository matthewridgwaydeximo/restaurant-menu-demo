import Dialog from "@/app/components/common/Dialog";
import DeleteItem from "@/app/components/dialog/DeleteItem";
import EditItem from "@/app/components/dialog/EditItem";
import { IsNullOrEmpty } from "@/app/helpers/helper";
import useItemsContext from "@/app/hooks/useItemsContext";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    SortingState,
    Cell,
} from "@tanstack/react-table";
import { useState } from "react";
import { FaEdit, FaSortDown, FaSortUp, FaTrashAlt } from "react-icons/fa";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

type TTableProps = {};

type Items = {
    id: string;
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
        size: 150,
    },
];

export default function Table({}: TTableProps) {
    const [id, setId] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const {
        items,
        setCategory,
        setName,
        setPrice,
        setCost,
        setOptions,
        setStock,
        editItemModal,
        deleteItemModal,
    } = useItemsContext();

    const handleDeleteIconClick = (cell: any) => {
        const { row } = cell;
        const { id } = row.original;

        deleteItemModal.current?.showModal();
        setId(id);
    };

    const handleEditIconClick = (cell: any) => {
        const { row } = cell;
        const { id } = row.original;

        editItemModal.current?.showModal();

        const item = items.find((item) => item.id === id);

        if (IsNullOrEmpty(item)) return;

        setCategory(item!.category);
        setName(item!.name);
        setPrice(item!.price);
        setCost(item!.cost);
        setOptions(item!.options);
        setStock(item!.stock);
        setId(id);
    };

    const table = useReactTable({
        data: items || [],
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
                                            <FaEdit
                                                className="absolute top-1/2 right-8  transform -translate-y-1/2 text-blue-500 cursor-pointer"
                                                onClick={() => {
                                                    handleEditIconClick(cell);
                                                }}
                                            />
                                            <FaTrashAlt
                                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                                onClick={() => {
                                                    handleDeleteIconClick(cell);
                                                }}
                                            />
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
            <Dialog ref={deleteItemModal} className="w-auto">
                <DeleteItem id={id} />
            </Dialog>
            <Dialog ref={editItemModal} className="w-auto">
                <EditItem id={id} />
            </Dialog>
        </div>
    );
}
