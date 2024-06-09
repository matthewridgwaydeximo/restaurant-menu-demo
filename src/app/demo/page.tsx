"use client";

import { useRef, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { MdErrorOutline, MdCheck } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { FaSortUp, FaSortDown } from "react-icons/fa";

import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    SortingState,
} from "@tanstack/react-table";

type Person = {
    name: string;
    age: number;
    status: string;
};

type Column = {
    accessorKey: string;
    header: string;
};

const data: Person[] = [
    { name: "Jane Doe", age: 28, status: "Single" },
    { name: "John Smith", age: 34, status: "Married" },
    { name: "Alice Johnson", age: 45, status: "Divorced" },
    { name: "Chris Lee", age: 22, status: "Single" },
];

const columns: Column[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "age",
        header: "Age",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
];

export default function Demo() {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [selected, setSelected] = useState(["papaya"]);

    return (
        <>
            <div className="flex w-full h-12 justify-center items-center">
                <h1 className="text-2xl font-bold text-teal">
                    Demo for components
                </h1>
            </div>

            <div className="flex w-full h-auto p-11 gap-4 items-center">
                <div className="flex flex-col gap-4">
                    <h2 className="text-1xl font-bold text-teal">Button</h2>
                    <button className="btn w-32">Button</button>
                    <button className="btn btn-neutral w-32">Neutral</button>
                    <button className="btn btn-primary w-32">Primary</button>
                    <button className="btn btn-secondary w-32">
                        Secondary
                    </button>
                    <button className="btn btn-accent w-32">Accent</button>
                    <button className="btn btn-ghost w-32">Ghost</button>
                    <button className="btn btn-link w-32">Link</button>
                </div>
            </div>

            <div className="flex w-full h-auto p-11 gap-4 items-center">
                <div>
                    <h2 className="text-1xl font-bold text-teal">Modal</h2>
                    <button
                        className="btn"
                        onClick={() => modalRef.current!.showModal()}
                    >
                        Open Modal
                    </button>
                    <dialog id="my_modal_3" className="modal" ref={modalRef}>
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                    <IoClose />
                                </button>
                            </form>
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">
                                Press ESC key or click on ✕ button to close
                            </p>
                        </div>
                    </dialog>
                </div>
            </div>

            <div className="flex w-full h-auto p-11 gap-4 items-center">
                <div className="flex flex-col gap-2">
                    <h2 className="text-1xl font-bold text-teal">Alerts</h2>
                    <div role="alert" className="alert alert-success">
                        <MdCheck />
                        <span>Your purchase has been confirmed!</span>
                    </div>
                    <div role="alert" className="alert alert-warning">
                        <CiWarning />
                        <span>Warning: Invalid email address!</span>
                    </div>
                    <div role="alert" className="alert alert-error">
                        <MdErrorOutline />
                        <span>Error! Task failed successfully.</span>
                    </div>
                    <div className="flex flex-col gap-4"></div>
                </div>
            </div>

            <div className="flex w-full h-auto p-11 gap-4">
                <div>
                    <h2 className="text-1xl font-bold text-teal">Loading</h2>
                    <span className="loading loading-ring loading-xs"></span>
                    <span className="loading loading-ring loading-sm"></span>
                    <span className="loading loading-ring loading-md"></span>
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            </div>

            <div className="flex w-full h-auto p-11 gap-4 items-center">
                <div>
                    <h2 className="text-1xl font-bold text-teal">Dropdown</h2>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        defaultValue="Who shot first?"
                    >
                        <option disabled>Who shot first?</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                </div>
            </div>

            <div className="flex w-full h-auto p-11 gap-4 items-center">
                <div>
                    <h2 className="text-1xl font-bold text-teal">Text Input</h2>
                    <label className="input input-bordered flex items-center gap-2">
                        <CiSearch />
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search"
                            required
                        />
                    </label>
                    <span className="text-red-500">
                        This field is required.
                    </span>
                </div>
            </div>

            <div className="flex w-full h-auto p-11 gap-4 items-center">
                <div>
                    <h2 className="text-1xl font-bold text-teal">Text Input</h2>
                    <TagsInput
                        value={selected}
                        onChange={setSelected}
                        name="fruits"
                        placeHolder="enter fruits"
                        classNames={{
                            tag: "text-teal",
                            input: "text-teal",
                        }}
                    />
                </div>
            </div>

            <Table />
        </>
    );
}

function Table() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

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
        <div className="p-4">
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="py-3 px-6 bg-teal text-white text-left text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors duration-300"
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
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="py-3 px-6 border border-gray-200 text-sm text-gray-700 w-52"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
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
