import React,{ useEffect } from "react";
import Aux from "../../../Hoc/Aux";
import Button from "../../../UI/Button/Button";

const OrderSummary=(props)=>{
    let ulItem=null;
    if(props.ingredients){
    ulItem=Object.keys(props.ingredients).map((item)=>{return <li key={item}><span style={{textTransform:"capitalize"}}>{item}</span>:{props.ingredients[item]}</li>})}
    useEffect(()=>{
        // console.log("OrderSummary rendered");
    }
        )

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your Burger contains ...</p>
            <ul>
                {ulItem}
            </ul>
            <h2>Price:{props.price.toFixed(2)}</h2>
            <p>Procced to checkout?</p>
            <Button btnType="Success" proceed={props.purchaseContinued}>Continue</Button>
            <Button btnType="Danger" proceed={props.purchaseCancelled}>Cancel</Button>
        </Aux>
    )
}

export default OrderSummary;