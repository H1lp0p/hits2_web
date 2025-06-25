import style from './btn.module.css'

export enum btnVariant{
    "outlined",
    "filled"
}

export interface ButtonProps{
    onClick?: () => void,
    variant?: "outlined" | "filled"
}

export const Button : React.FC<React.PropsWithChildren<ButtonProps>> = ({onClick, variant = "filled", children}) => {

    return (
        <button 
            onClick={onClick}
            className={`button ${variant == "filled" ? style.filled : style.outlined}`}
        >
            {children}
        </button>
    )
}