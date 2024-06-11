import classNames from "classnames";
import { forwardRef } from "react";
import { IoClose } from "react-icons/io5";

type TDialogProps = {
    className?: string;
    children: React.ReactNode;
};

function Dialog(
    { className, children }: TDialogProps,
    ref: React.Ref<HTMLDialogElement>
) {
    return (
        <dialog className="modal" ref={ref}>
            <div
                className={classNames(className, {
                    "modal-box": true,
                    "max-w-full": true,
                })}
            >
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        <IoClose />
                    </button>
                </form>
                {children}
            </div>
        </dialog>
    );
}

export default forwardRef(Dialog);
