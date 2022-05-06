import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.css'

const Burger=(props)=>{
    let ingredientList=null;
    if(props.ingredients){
    ingredientList=Object.keys(props.ingredients).map(item=>{
        return [...Array(props.ingredients[item])].map((emtyItem,index)=>{
            return <BurgerIngredient key={item + index} type={item} />
        })
    }).reduce((arr,ele)=>{return arr.concat(ele)},[]);
    if(ingredientList.length===0){
        ingredientList=<p>Start adding Ingredients~</p>
    }
}

    // console.log(ingredientList)
    // if(ingredientList.length===0){
    //     ingredientList=<p>Start adding Ingredients~</p>
    // }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="breadTop"/>
            {ingredientList}
            <BurgerIngredient type="breadBottom"/>
        </div>
    );
}

export default Burger;