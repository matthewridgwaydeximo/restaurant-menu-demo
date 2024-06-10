import classNames from "classnames";
import { MouseEventHandler } from "react";

type TButtonProps = {
    text: string;
    className?: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ text, className, onClick }: TButtonProps) {
    return (
        <button
            className={classNames(className, {
                btn: true,
                "w-32": true,
            })}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
