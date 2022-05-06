import * as actionType from "../Action/actionType"
import updateState from "./utility"

let initialState={
    ingredients:null,
    totalPrice:2,
}


const reducer=(state=initialState,action)=>{
    const PriceChart={salad:0.75, meat:0.5, bacon:0.4, cheese:0.65}
    let changedprice;
    // console.log(state)
    switch (action.type){
        case (actionType.ADD_ITEM):
            changedprice=state.totalPrice+PriceChart[action.itemType];
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.itemType]:state.ingredients[action.itemType]+1,
                },
                totalPrice:changedprice,
            }

        case (actionType.REMOVE_ITEM):
            changedprice=state.totalPrice-PriceChart[action.itemType];
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.itemType]:state.ingredients[action.itemType]-1,
                },
                totalPrice:changedprice,
            }

        case (actionType.INGREDIENT_FETCHED):
            let net=Object.keys(action.val).reduce((price,item)=>{
                        price=price+(PriceChart[item]*action.val[item]);
                        return price;},2);
            return updateState(state,{ingredients:{salad:action.val.salad,bacon:action.val.bacon,cheese:action.val.cheese,meat:action.val.meat},totalPrice:net,})

        default:{
            return state;
        }
    }
}

export default reducer