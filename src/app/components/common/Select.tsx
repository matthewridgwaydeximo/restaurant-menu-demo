"use client";

import { api } from "@/app/api/api";
import classNames from "classnames";
import { ChangeEvent, useEffect, useState } from "react";
import { FaAsterisk } from "react-icons/fa";

type TSelectProps = {
    id: string;
    label: string;
    value: string;
    isRequired?: boolean;
    className?: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    children?: React.ReactNode;
};

type TCategoriesProps = {
    id: number;
    name: string;
};

type TOptionsProps = {
    options: TCategoriesProps[] | null;
};

const API_METHODS = "GET";
const API_PATH = "/categories.json";

export default function Select({
    id,
    label,
    value,
    onChange,
    className,
    isRequired,
}: TSelectProps) {
    const [categories, setCategories] = useState<TCategoriesProps[] | null>([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const result = await api(API_METHODS, API_PATH);
            setCategories(result);
        } catch (error) {
            // TODO Handle error
        }
    };

    return (
        <label className="form-control">
            <div className="flex justify-start label gap-2 ">
                {isRequired && <FaAsterisk className="text-red-600 text-xs" />}
                <span className="label-text font-bold text-md text-teal uppercase">
                    {label}
                </span>
            </div>
            <select
                id={id}
                value={value}
                className={classNames(className, {
                    select: true,
                    "select-bordered": true,
                })}
                onChange={onChange}
            >
                <Option options={categories} />
            </select>
            {isRequired && (
                <div className="label">
                    <span className="label-text-alt text-red-600">
                        This field is required
                    </span>
                </div>
            )}
        </label>
    );
}

function Option({ options }: TOptionsProps) {
    return options?.map((option) => {
        return (
            <option key={option.id} value={option.name}>
                {option.name}
            </option>
        );
    });
}
