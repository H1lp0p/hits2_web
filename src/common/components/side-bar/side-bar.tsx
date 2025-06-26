import { CSSProperties, useState } from "react";
import { useMySelector } from "../../../hooks/my-selector";
import { BackGround } from "./back-ground";
import css from './side-bar.module.css'
import { BaseProps } from "../../interfaces/base-props";

import Left from '../../../assets/left.svg?react'
import Right from '../../../assets/right.svg?react'

import Profile from '../../../assets/User.svg?react'
import Admin from '../../../assets/Administrator.svg?react'
import File from '../../../assets/Administrator-1.svg?react'
import Chain from '../../../assets/Link.svg?react'
import Map from '../../../assets/Map.svg?react'

import Collapse from '../../../assets/Collapse.svg?react'

import { Link, useLocation } from "react-router-dom";
import { StrangeHeader } from "../header/strange-header";
import { Outlet } from "react-router-dom";
import { pathToTitle } from "../../tools/path-to-title";

export interface SideBarProps extends BaseProps{
    collapsed?: boolean,
    hiden?: boolean,
}

const SideBar : React.FC<React.PropsWithChildren<SideBarProps>> = ( props ) => {

    const {collapsed = true, hiden = false} = props

    const location = useLocation()

    const headerTitle = pathToTitle(location.pathname)

    const userAvatar = useMySelector((state) => state.profile.avatar)
    
    //true = min
    const [collapseState, setCollapse] = useState(collapsed);

    const handleOpen = () => {
        setCollapse(false);
    }

    const handleClose = () => {
        setCollapse(true);
    }

    const togleCollapse = () => {
        setCollapse(col => !col)
    }

    const icoStyle: CSSProperties = {
        stroke: "white",
        width: "18px",
        height: "18px",
    }

    const curLocation = useLocation();

    type barItem = {
        title: string,
        ico: React.ReactNode,
        linkTo: string
    }

    const items = [
        {
            title: "Профиль",
            ico: <Profile/>,
            linkTo: "/profile"
        },
        {
            title: "Администрирование",
            ico: <Admin/>,
            linkTo: "admin"
        },
        {
            title: "Справки",
            ico: <File/>,
            linkTo: "/certificates"
        },
        {
            title: "Полезные сервисы",
            ico: <Chain/>,
            linkTo: "/usefulservices"
        },
        {
            title: "Мероприятия",
            ico: <Map/>,
            linkTo: "/events"
        }
    ]

    return (
        <div>
            <BackGround visible={!collapseState} onClick={() => {handleClose()}}/>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "start"}}>

                <div className={css.sideBar} data-collapsed={collapseState}>
                    <div onClick={() => {togleCollapse()}} style={{marginTop: "31px", width: "100%", display: "flex", position: "relative", justifyContent: "center"}}>
                        {userAvatar.state === "pending" && <div className={css.avatar} style={{backgroundColor: "gray"}}/>} 
                        {userAvatar.state === 'success' &&
                            userAvatar.avatarBase64 && <img className={css.avatar} src={userAvatar.avatarBase64} alt="user avatar"/>}
                        <span className={css.collapseIco}>{collapseState ? <Right style={icoStyle}/> : <Left style={icoStyle}/>}</span>
                    </div>

                    <div style={{marginTop: "72px"}}>
                        {items.map((el) => {
                            const {title, ico, linkTo} = el as barItem

                            return (
                                <Link to={linkTo} key={`sideBarItem_${el.title}`}>
                                    <div className={css.sideBarItem} data-selected={linkTo == curLocation.pathname}>
                                    {ico}
                                    <span className="p1">{title}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                </div>

                <div className={css.content}>
                    <StrangeHeader 
                    collapseMenu={<div onClick={() => {handleOpen()}}><Collapse stroke="#3A3A3A"/></div>} 
                    title={headerTitle}
                    lang={"ru"} 
                    onLangChange={(lang: "ru" | "eng") => console.log(`lang changed to ${lang}`)}     
                    style={{width: "100%"}}          
                    />
                    <Outlet/>
                </div>
            </div>
            
        </div>
    );
}

export default SideBar;