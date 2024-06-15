import { ChangeEvent, createContext, ReactNode, useRef, useState } from "react";

export const ItemsContext = createContext<{
    category: string;
    name: string;
    price: string;
    cost: string;
    options: string[];
    stock: string;
    isSuccess: boolean;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onTagsChange: (tags: string[]) => void | undefined;
    onAddItem: () => void;
} | null>(null);

export default function ItemsContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [cost, setCost] = useState("");
    const [options, setOptions] = useState<string[]>([]);
    const [stock, setStock] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        switch (id) {
            case "category":
                setCategory(value);
                break;
            case "name":
                setName(value);
                break;
            case "price":
                setPrice(value);
                break;
            case "cost":
                setCost(value);
                break;
            case "stock":
                setStock(value);
                break;
            default:
                break;
        }
    };

    const onTagsChange = (tags: string[]) => {
        setOptions(tags);
    };

    const onAddItem = () => {
        // TODO Add item to database

        const item = {
            category,
            name,
            price,
            cost,
            options: options,
            stock,
        };

        setIsSuccess(true);

        setTimeout(() => {
            setIsSuccess(false);

            setCategory("");
            setName("");
            setPrice("");
            setCost("");
            setOptions([]);
            setStock("");
        }, 3000);
    };

    return (
        <ItemsContext.Provider
            value={{
                category,
                name,
                price,
                cost,
                options,
                stock,
                isSuccess,
                onTagsChange,
                onInputChange,
                onAddItem,
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
}
