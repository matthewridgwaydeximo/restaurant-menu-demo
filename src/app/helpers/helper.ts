import { Items } from "@/app/helpers/types";

export const IsNullOrEmpty = <T>(value: T) => {
    return (
        value === null ||
        value === undefined ||
        value === "" ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (Array.isArray(value) && value.length === 0)
    );
};

export const RandomIdGenerator = (length: number = 64) => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
};

export const InputAsNumber = (value: string) => {
    return value.replace(/[^0-9.]/g, "");
};

export const TransformData = (data: Items[]) => {
    if (IsNullOrEmpty(data)) return [];
    return Object.keys(data).map((key: string) => data[key as any]);
};
