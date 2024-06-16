import Alert from "@/app/components/common/Alert";
import Button from "@/app/components/common/Button";
import Input from "@/app/components/common/Input";
import Select from "@/app/components/common/Select";
import useItemsContext from "@/app/hooks/useItemsContext";
import { MdCheck, MdOutlineErrorOutline } from "react-icons/md";
import { TagsInput } from "react-tag-input-component";

type TEditItemProps = {
    id: string;
};

export default function EditItem({ id }: TEditItemProps) {
    const {
        category,
        name,
        price,
        cost,
        options,
        stock,
        isError,
        isSuccess,
        onCategoryChange,
        onInputChange,
        onTagsChange,
        onEditItem,
    } = useItemsContext();

    return (
        <div className="flex flex-col flex-wrap justify-center items-center gap-4">
            <h2 className="text-2xl font-bold text-teal">Edit Item</h2>

            {isSuccess && (
                <Alert
                    className="alert-success w-fit"
                    text="You've successfully editted an item!"
                >
                    <MdCheck />
                </Alert>
            )}
            {isError && (
                <Alert
                    className="alert-error w-fit"
                    text="Please fill out all required fields."
                >
                    <MdOutlineErrorOutline />
                </Alert>
            )}
            <div className="flex gap-4">
                <Select
                    id="category"
                    label="Category"
                    className="w-64"
                    value={category}
                    onChange={onCategoryChange}
                    isRequired
                />
                <Input
                    id="name"
                    label="Name"
                    className="w-64"
                    value={name}
                    onChange={onInputChange}
                    isRequired
                />
            </div>

            <div className="flex gap-4">
                <Input
                    id="price"
                    label="Price"
                    className="w-64"
                    value={price}
                    onChange={onInputChange}
                    isRequired
                />
                <Input
                    id="cost"
                    label="Cost"
                    className="w-64"
                    value={cost}
                    onChange={onInputChange}
                    isRequired
                />
            </div>
            <div className="w-full px-24">
                <TagsInput
                    value={options}
                    onChange={onTagsChange}
                    name="options"
                    placeHolder="Enter options"
                    classNames={{
                        tag: "text-teal",
                        input: "text-teal",
                    }}
                />
            </div>

            <div className="flex gap-4">
                <Input
                    id="stock"
                    label="Stock"
                    className="w-64"
                    value={stock}
                    onChange={onInputChange}
                    isRequired
                />
            </div>

            <Button
                text="Edit Item"
                className="btn-accent w-32 uppercase text-white font-bold"
                onClick={() => onEditItem(id)}
            />
        </div>
    );
}
