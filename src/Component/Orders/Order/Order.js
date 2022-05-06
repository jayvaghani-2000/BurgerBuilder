import React from "react"
import classes from "./Order.css"
const Order=(props)=>{
    // let ingredientList=[];

    // console.log(props)
    return (
        <div className={classes.Order}>
            <p>Ingredients:</p>
            <span>Salad({props.ingredients.salad}) </span>
            <span> Bacon({props.ingredients.bacon}) </span>
            <span> Meat({props.ingredients.meat}) </span>
            <span> Cheese({props.ingredients.cheese}) </span>
            <p>Price:<strong>{props.price}</strong></p>
        </div>
    )
}

export default Order