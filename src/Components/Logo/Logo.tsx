import React from "react";
import s from "./Logo.module.css"
import logo from "../../media/logo.svg"
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Link, useLocation } from 'react-router-dom';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import HistoryIcon from '@material-ui/icons/History';


const Logo =()=>{
    let location=useLocation();
    return (
        <div className={s.logoinner}>
            <div className={s.logo}>
                <img src={logo} alt=""/>
                { location.pathname === "/" && <Link to="/history"><HistoryIcon className={s.listlogo}/></Link>}
                { location.pathname === "/history" && <Link to="/"><PlaylistAddIcon className={s.listlogo}/></Link>}
                
            </div>
            <div>
                
            </div>
        </div>
    )
}
export default Logo