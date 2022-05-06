import React from 'react';
import burgerLogo from '../../Assest/Images/burger-logo.png'
import classes from "./Logo.css"

const Logo = (props) => {
    return (<div className={classes.Logo} onClick={props.onclick}>
        <img src={burgerLogo} alt="Your Burger" ></img>
    </div>)
}

export default Logo;