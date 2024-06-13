"use client";

import Alert from "@/app/components/common/Alert";
import Button from "@/app/components/common/Button";
import Dialog from "@/app/components/common/Dialog";
import Input from "@/app/components/common/Input";
import Table from "@/app/components/common/Table";
import { useRef, useState } from "react";
import { MdCheck } from "react-icons/md";

export default function Home() {
    const [text, setText] = useState("");
    const modalRef = useRef<HTMLDialogElement>(null);
    return (
        <>
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
        </>
    );
}
