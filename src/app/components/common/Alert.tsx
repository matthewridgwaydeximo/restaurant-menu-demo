import classNames from "classnames";
import { Children, ReactNode } from "react";

type TAlertProps = {
    children: ReactNode;
    text: string;
    className?: string;
};

export default function Alert({ children, className }: TAlertProps) {
    return (
        <div
            role="alert"
            className={classNames(className, {
                alert: true,
            })}
        >
            {children}
            <span>Your purchase has been confirmed!</span>
        </div>
    );
}
