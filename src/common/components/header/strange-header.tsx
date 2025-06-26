import { BaseProps } from "../../interfaces/base-props";
import css from './strange-header.module.css'

export interface StrangeHeaderProps extends BaseProps{
    collapseMenu: React.ReactNode,
    title: string,
    titleStyle?: React.CSSProperties,
    lang: "ru" | "eng",
    onLangChange: (lang: "ru" | "eng") => void
}

const strings = {
    lang: {
        ru: "Русский",
        eng: "English"
    }
}

export const StrangeHeader : React.FC<StrangeHeaderProps> = (props) => {

    const {collapseMenu, title, titleStyle, lang, onLangChange} = props

    return (
        <div className={css.header}>
            <div className={css.menuBtn}>{collapseMenu}</div>
            <div className={css.headerTitle}><span className="h1" style={titleStyle}>{title}</span></div>
            <div className={css.langOpt} style={{justifySelf: "end"}}>LANG</div>
        </div>
    )
}