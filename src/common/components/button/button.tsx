import { BaseProps } from '../../interfaces/base-props'
import css from './btn.module.css'

export enum btnVariant{
    "outlined",
    "filled"
}

export interface ButtonProps extends BaseProps{
    onClick?: () => void,
    variant?: "outlined" | "filled",
    disabled?: boolean,
}

export const Button : React.FC<React.PropsWithChildren<ButtonProps>> = ({onClick, variant = "filled", disabled, className, style, children}) => {

    return (
        <button 
            onClick={onClick}
            className={`button ${variant == "filled" ? css.filled : css.outlined} ${className}`}
            style={style}
            disabled={disabled}
        >
            {children}
        </button>
    )
}