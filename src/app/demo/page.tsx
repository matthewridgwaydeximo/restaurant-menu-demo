"use client";

import { useRef, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { MdErrorOutline, MdCheck } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
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
import Button from "@/app/components/common/Button";
import Input from "@/app/components/common/Input";
import Dialog from "@/app/components/common/Dialog";
import Alert from "@/app/components/common/Alert";
import Loading from "@/app/components/common/Loading";

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
    const [text, setText] = useState("");

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
                    <Button
                        text="Button"
                        className="btn w-32"
                        onClick={() => alert("Button clicked: Button")}
                    />
                    <Button
                        text="Neutral"
                        className="btn btn-neutral w-32"
                        onClick={() => alert("Button clicked: Neutral")}
                    />
                    <Button
                        text="Primary"
                        className="btn-primary w-32"
                        onClick={() => alert("Button clicked: Primary")}
                    />
                    <Button
                        text="Secondary"
                        className="btn btn-secondary w-32"
                        onClick={() => alert("Button clicked: Secondary")}
                    />
                    <Button
                        text="Accent"
                        className="btn btn-accent w-32"
                        onClick={() => alert("Button clicked: Accent")}
                    />
                    <Button
                        text="Ghost"
                        className="btn btn-ghost w-32"
                        onClick={() => alert("Button clicked: Ghost")}
                    />
                    <Button
                        text="Link"
                        className="btn btn-link w-32"
                        onClick={() => alert("Button clicked: Link")}
                    />
                </div>
            </div>

            <div className="flex w-full h-auto p-11 gap-4 items-center">
                <div>
                    <h2 className="text-1xl font-bold text-teal">Modal</h2>

                    <Button
                        text="Open Modal"
                        className="btn-accent w-32"
                        onClick={() => modalRef.current!.showModal()}
                    />
                </div>
            </div>

            <div className="flex w-full h-auto p-11 gap-4 items-center">
                <div className="flex flex-col gap-2">
                    <h2 className="text-1xl font-bold text-teal">Alerts</h2>
                    <Alert
                        className="alert-success"
                        text="Your puchase has been confirmed"
                    >
                        <MdCheck />
                    </Alert>
                    <Alert
                        className="alert-warning"
                        text="Warning: Invalid email address!"
                    >
                        <CiWarning />
                    </Alert>
                    <Alert
                        className="alert-error"
                        text="Error! Task failed successfully."
                    >
                        <MdErrorOutline />
                    </Alert>
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
                    <Input
                        id="name"
                        label="Name"
                        value={text}
                        className="w-64"
                        isRequired
                        onChange={(e) => setText(e.target.value)}
                    />
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

            <Dialog ref={modalRef} className="w-[40%] ">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col flex-wrap justify-center items-center gap-4">
                        <h2 className="text-2xl font-bold text-teal">
                            Add New Item
                        </h2>

                        <Alert
                            className="alert-success w-fit"
                            text="You've successfully added a new item!"
                        >
                            <MdCheck />
                        </Alert>
                        <div className="flex gap-4">
                            <Input
                                id="name"
                                label="Name"
                                value={text}
                                className="w-64"
                                isRequired
                                onChange={(e) => setText(e.target.value)}
                            />
                            <Input
                                id="name"
                                label="Name"
                                value={text}
                                className="w-64"
                                isRequired
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-4">
                            <Input
                                id="name"
                                label="Name"
                                value={text}
                                className="w-64"
                                isRequired
                                onChange={(e) => setText(e.target.value)}
                            />
                            <Input
                                id="name"
                                label="Name"
                                value={text}
                                className="w-64"
                                isRequired
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-4">
                            <Input
                                id="name"
                                label="Name"
                                value={text}
                                className="w-64"
                                isRequired
                                onChange={(e) => setText(e.target.value)}
                            />
                            <Input
                                id="name"
                                label="Name"
                                value={text}
                                className="w-64"
                                isRequired
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        <Button
                            text="Close"
                            className="btn-accent w-32 "
                            onClick={() => modalRef.current!.close()}
                        />
                    </div>
                </div>
            </Dialog>

            {/* <Loading /> */}
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
