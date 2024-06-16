"use client";

import Button from "@/app/components/common/Button";
import Dialog from "@/app/components/common/Dialog";
import Input from "@/app/components/common/Input";
import Table from "@/app/components/common/Table";
import AddItem from "@/app/components/dialog/AddItem";
import useItemsContext from "@/app/hooks/useItemsContext";

export default function Home() {
    const { searchText, addItemModal, onSearch } = useItemsContext();

    return (
        <>
            <div className="flex flex-col items-center justify-center w-fit">
                <div className="flex ">
                    <Input
                        id="search"
                        label="Search"
                        className="w-64"
                        value={searchText}
                        onChange={(e) => {
                            onSearch(e.target.value);
                        }}
                    />
                </div>

                <Button
                    text="Add an item"
                    className="btn btn-link w-32 self-end p-0"
                    onClick={() => addItemModal.current!.showModal()}
                />
                <div className="flex items-center">
                    <Table />
                </div>
            </div>
            <Dialog ref={addItemModal} className="w-[40%] ">
                <div className="flex flex-col gap-2">
                    <AddItem />
                </div>
            </Dialog>
        </>
    );
}
