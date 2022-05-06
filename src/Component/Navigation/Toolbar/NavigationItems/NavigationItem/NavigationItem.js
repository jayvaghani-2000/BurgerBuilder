import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.css"

const NavigationItem = (props) => {
    return (<li className={classes.NavigationItem}><NavLink to={props.link} exact activeClassName={classes.active} onClick={props.clicked}>{props.children}</NavLink></li>)
} 

export default NavigationItem;