import React from "react";
import classes from './BuildControls.css'
import BuildControl from "./BuildControl/BuildControl";
import { connect } from "react-redux";

const selectIngredient=[
    {label:"Salad", type:"salad"},
    {label:"Meat", type:"meat"},
    {label:"Bacon", type:"bacon"},
    {label:"Cheese", type:"cheese"}
];

const BuildControls=(props)=>{
    return (
        <div className={classes.BuildControls}>
            <p>Current Price:<b>{props.currentAmount.toFixed(2)}</b></p>
            {selectIngredient.map((item)=>{return (<BuildControl  
                key={item.label} 
                label={item.label} 
                add={()=>{props.itemAdded(item.type)
                    let localIng=props.ing;
                    localIng[item.type]++;
                    props.updatePurchaseable(localIng)
                }}
                remove={()=>{props.itemRemoved(item.type)
                    props.updatePurchaseable(props.ing)
                    let localIng=props.ing;
                    localIng[item.type]--;
                    props.updatePurchaseable(localIng)
                }}
                disableDicision={props.disableData[item.type]}
                />)
            })}
            <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.buying}>{props.isAuth?"Order Now!":"Register To Processed"}</button>
        </div>
    );
}
let stateMapToProp=state=>{
    return{
        ing:state.bur.ingredients
    }
}

export default connect(stateMapToProp)(BuildControls);