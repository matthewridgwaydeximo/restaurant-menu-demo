import classNames from "classnames";
import { ChangeEvent } from "react";
import { FaAsterisk } from "react-icons/fa";

type TTextBoxProps = {
    id: string;
    label: string;
    value: string;
    isRequired?: boolean;
    className?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
};

export default function Input({
    id,
    label,
    value,
    isRequired,
    className,
    onChange,
}: TTextBoxProps) {
    return (
        <label className="form-control">
            <div className="flex justify-start label gap-2 ">
                {isRequired && <FaAsterisk className="text-red-600 text-xs" />}
                <span className="label-text font-bold text-md text-teal uppercase">
                    {label}
                </span>
            </div>
            <input
                id={id}
                type="text"
                value={value}
                placeholder="Type here"
                className={classNames(className, {
                    input: true,
                    "input-bordered": true,
                })}
                onChange={onChange}
            />
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
