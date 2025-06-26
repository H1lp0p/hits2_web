import css from './side-bar.module.css'

export interface SideBarBackGroundProps{
    visible: boolean, 
    onClick?: () => void;
}

export const BackGround : React.FC<SideBarBackGroundProps> = ({onClick, visible}) => {
    return (<div className={css.background} onClick={onClick} data-visible={visible}/>)
}