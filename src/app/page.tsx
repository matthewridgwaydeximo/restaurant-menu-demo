"use client";

import Button from "@/app/components/common/Button";
import Dialog from "@/app/components/common/Dialog";
import Table from "@/app/components/common/Table";
import AddItem from "@/app/components/dialog/AddItem";
import ItemsContextProvider from "@/app/context/ItemContextProvider";
import { useRef } from "react";

export default function Home() {
    const modalRef = useRef<HTMLDialogElement>(null);

    return (
        <ItemsContextProvider>
            <div className="flex flex-col items-center justify-center w-fit">
                <Button
                    text="Add an item"
                    className="btn btn-link w-32 self-end p-0"
                    onClick={() => modalRef.current!.showModal()}
                />
                <div className="flex items-center">
                    <Table />
                </div>
            </div>
            <Dialog ref={modalRef} className="w-[40%] ">
                <div className="flex flex-col gap-2">
                    <AddItem />
                </div>
            </Dialog>
        </ItemsContextProvider>
    );
}
