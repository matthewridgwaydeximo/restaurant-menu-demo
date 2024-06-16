import { ItemsContext } from "@/app/context/ItemContextProvider";
import { useContext } from "react";

export default function useItemsContext() {
    const context = useContext(ItemsContext);

    if (!context) {
        throw new Error(
            "useItemsContext must be used within an ItemsContextProvider"
        );
    }

    return context;
}
