import * as actionType from "./actionType" 
import axios from "../../axiosOrder"

export const fetch_Ingredients=()=>{
    // console.log("Hii    ")
    return function(dispatch){
    axios.get("/ingredients.json").then(res=>{
        // console.log(res)
        dispatch({type:actionType.INGREDIENT_FETCHED,val:res.data})    
    }).catch(err=>console.log(err));
    }
}

export const add_Item=(item)=>{
    return {
        type:actionType.ADD_ITEM,
        itemType:item
    }
}
export const remove_Item=(item)=>{
    return {
        type:actionType.REMOVE_ITEM,
        itemType:item
    }
}