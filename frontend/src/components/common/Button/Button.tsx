import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from "react";

export default function Button({
    children, 
    onClick, 
    props
}: {
    children: ReactElement, 
    onClick: () => void, 
    props?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
}) {
    return (
        <button {...props} className="icon-button" onClick={onClick}>
            {children}
        </button>
    )
}