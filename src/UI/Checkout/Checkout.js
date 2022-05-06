import React from "react";
import classes from "./Checkout.css"

const Checkout=(props)=>{
    // console.log("Checkout clicked")
    return (
        props.show?<div 
        className={classes.Checkout}
        onClick={props.checkoutClick}></div>:null
    )
}

export default Checkout;