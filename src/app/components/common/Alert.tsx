import classNames from "classnames";
import { ReactNode } from "react";

type TAlertProps = {
    children: ReactNode;
    text: string;
    className?: string;
};

export default function Alert({ children, text, className }: TAlertProps) {
    return (
        <div
            role="alert"
            className={classNames(className, {
                alert: true,
            })}
        >
            {children}
            <span>{text}</span>
        </div>
    );
}
