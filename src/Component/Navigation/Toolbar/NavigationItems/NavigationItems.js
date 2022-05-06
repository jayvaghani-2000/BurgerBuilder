import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css"
import { connect } from "react-redux";

export const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/"  clicked={props.clicked}>Burger Builder</NavigationItem>
            {props.isAuth?<NavigationItem link="/orders" clicked={props.clicked}>Orders </NavigationItem>:null}
            {props.isAuth?<NavigationItem link="/logout" clicked={props.clicked}>Logout</NavigationItem>:<NavigationItem link="/auth" clicked={props.clicked}>Authenticate</NavigationItem>}
        </ul>
    ) 
}

const mapStateToProps=state=>{
    return {
        isAuth:state.auth.idToken!==null
    }
}
    
export default connect(mapStateToProps,null)(NavigationItems);