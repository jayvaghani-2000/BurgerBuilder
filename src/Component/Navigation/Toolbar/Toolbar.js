//burger-logo

import React from "react";
import classes from "./Toolbar.css"
import Logo from "../../Logo/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";

const Toolbar=(props)=>{
    return (
        <div className={classes.Toolbar}>
            <div onClick={props.toggle} className={classes.DrawerToggle}><div className="foo"></div><div></div><div></div></div>
            <div className={classes.Logo}>
                <Logo onclick={props.redirectToHome}/>
            </div>
            <nav className={classes.isMobile}>
                <NavigationItems />
            </nav>
        </div>
    )
}

export default Toolbar;