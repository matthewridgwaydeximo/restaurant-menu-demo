"use client";

import { debounce } from "lodash";
import { api } from "@/app/api/api";
import {
    InputAsNumber,
    IsNullOrEmpty,
    RandomIdGenerator,
    TransformData,
} from "@/app/helpers/helper";
import { Items } from "@/app/helpers/types";
import {
    ChangeEvent,
    createContext,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";

export const ItemsContext = createContext<{
    category: string;
    name: string;
    price: string;
    cost: string;
    options: string[];
    stock: string;
    items: Items[];
    isError: boolean;
    isSuccess: boolean;
    searchText: string;
    setCategory: (category: string) => void;
    setName: (name: string) => void;
    setPrice: (price: string) => void;
    setCost: (cost: string) => void;
    setOptions: (options: string[]) => void;
    setStock: (stock: string) => void;
    addItemModal: React.RefObject<HTMLDialogElement>;
    editItemModal: React.RefObject<HTMLDialogElement>;
    deleteItemModal: React.RefObject<HTMLDialogElement>;
    onCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onTagsChange: (tags: string[]) => void | undefined;
    onSearch: (searchTerm: string) => void;
    onAddItem: () => void;
    onEditItem: (id: string) => void;
    onDeleteItem: (id: string) => void;
} | null>(null);

const API_GET_METHOD = "GET";
const API_GET_PATH = `/items.json`;
const API_PUT_METHOD = "PUT";
const API_DELETE_METHOD = "DELETE";
const API_SLUG_PATH = `/items/{id}.json`;

export default function ItemsContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [category, setCategory] = useState("Appetizers");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [cost, setCost] = useState("");
    const [options, setOptions] = useState<string[]>([]);
    const [stock, setStock] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [items, setItems] = useState<Items[]>([]);
    const [searchText, setSearchText] = useState("");

    const addItemModal = useRef<HTMLDialogElement>(null);
    const editItemModal = useRef<HTMLDialogElement>(null);
    const deleteItemModal = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        const data = await api(API_GET_METHOD, API_GET_PATH);
        setItems(TransformData(data));
    }
    const isValidInput = () => {
        return (
            !IsNullOrEmpty(category) &&
            !IsNullOrEmpty(name) &&
            !IsNullOrEmpty(price) &&
            !IsNullOrEmpty(cost) &&
            !IsNullOrEmpty(stock)
        );
    };

    const onSearch = (searchTerm: string) => {
        searchItems(searchTerm);
        setSearchText(searchTerm);
    };

    const searchItems = debounce((search: string) => {
        if (IsNullOrEmpty(search)) {
            fetchItems();
            return;
        }

        let filtered = items.filter(
            (item) =>
                item.category.toLowerCase().includes(search.toLowerCase()) ||
                item.name.toLowerCase().includes(search.toLowerCase())
        );
        setItems(filtered);
    }, 1000);

    const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        switch (id) {
            case "name":
                setName(value);
                break;
            case "price":
                setPrice(InputAsNumber(value));
                break;
            case "cost":
                setCost(InputAsNumber(value));
                break;
            case "stock":
                setStock(InputAsNumber(value));
                break;
            default:
                break;
        }
    };

    const onTagsChange = (tags: string[]) => {
        setOptions(tags);
    };

    const onAddItem = async () => {
        try {
            if (!isValidInput()) {
                setIsError(true);
                return;
            }

            setIsError(false);
            const id = RandomIdGenerator();

            const params: Items = {
                id,
                category,
                name,
                price,
                cost,
                options: options,
                stock,
            };

            await api(
                API_PUT_METHOD,
                API_SLUG_PATH.replace("{id}", id),
                params
            );
            setIsSuccess(true);
            setItems([...items, params]);

            setTimeout(() => {
                setIsSuccess(false);

                setCategory("Appetizers");
                setName("");
                setPrice("");
                setCost("");
                setOptions([]);
                setStock("");
            }, 1000);
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const onEditItem = async (id: string) => {
        try {
            if (!isValidInput()) {
                setIsError(true);
                return;
            }

            setIsError(false);

            const params: Items = {
                id,
                category,
                name,
                price,
                cost,
                options: options,
                stock,
            };

            await api(
                API_PUT_METHOD,
                API_SLUG_PATH.replace("{id}", id),
                params
            );
            setItems(items.map((item) => (item.id === id ? params : item)));
            setIsSuccess(true);

            setTimeout(() => {
                setIsSuccess(false);

                setCategory("Appetizers");
                setName("");
                setPrice("");
                setCost("");
                setOptions([]);
                setStock("");
            }, 1000);
        } catch (error) {
            console.error("Error editing item:", error);
        }
    };

    const onDeleteItem = async (id: string) => {
        try {
            await api(API_DELETE_METHOD, API_SLUG_PATH.replace("{id}", id));
            setItems(items.filter((item) => item.id !== id));
            deleteItemModal.current?.close();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
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
                items,
                searchText,
                isError,
                isSuccess,
                setCategory,
                setName,
                setPrice,
                setCost,
                setOptions,
                setStock,
                addItemModal,
                editItemModal,
                deleteItemModal,
                onCategoryChange,
                onInputChange,
                onTagsChange,
                onSearch,
                onAddItem,
                onEditItem,
                onDeleteItem,
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
}
