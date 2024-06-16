import Button from "@/app/components/common/Button";
import useItemsContext from "@/app/hooks/useItemsContext";

type TDeleteItemProps = {
    id: string;
};

export default function DeleteItem({ id }: TDeleteItemProps) {
    const { onDeleteItem } = useItemsContext();

    return (
        <div className="flex flex-col flex-wrap justify-center items-center gap-4">
            <h2 className="text-2xl font-bold text-teal">Delete Item</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex gap-4">
                <Button
                    text="Delete Item"
                    className="btn-accent w-32 uppercase text-white font-bold"
                    onClick={() => onDeleteItem(id)}
                />
            </div>
        </div>
    );
}
