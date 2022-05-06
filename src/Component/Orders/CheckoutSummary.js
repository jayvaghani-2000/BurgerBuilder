import React from "react";
import { withRouter } from "react-router-dom";
import Burger from "../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css"
const CheckoutSummary=(props)=>{
    return (
        <div className={classes.CheckoutSummary}>
            <h2>Burger</h2>
            <Burger ingredients={props.ingredients}/>
            <Button btnType="Success" proceed={()=>
            {props.history.replace("/checkout/contact")}}>CONTINUE</Button>
            <Button btnType="Danger" proceed={()=>
            {props.history.goBack() 
            }}>CANCEL</Button>
        </div>
    )

}

export default withRouter(CheckoutSummary);