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

import { useState, useEffect } from 'react'

function SvgLoader({src, cls}: {src: string, cls: string}) {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    fetch(src)
      .then(res => res.text())
      .then(text => setSvgContent(text))
      .catch(console.error);
  }, [src]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgContent }}
      className={cls}
    />
  );
}