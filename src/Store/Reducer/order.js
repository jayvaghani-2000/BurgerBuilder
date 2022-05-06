import * as actionType from "./../Action/actionType"

let initialState={
    orders:[],
    loading:false,
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionType.BURGER_PURCHASE_SUCCESS:{
            // console.log(state.orders)
            // let element={id:action.orderId.name,...action.orderData}
            return {
                ...state,
                loading:false,
                // orders:state.orders.concat(element)
            }
        } 
        case actionType.BURGER_PURCHASE_FAIL:{
            return {
                ...state,
                loading:false
            }
        }
        case actionType.BURGER_PURCHASE_PROCESSING:{
            return {
                ...state,
                loading:true,
            }
        }
        case actionType.FETCH_ORDER_PROCESSING:{
            return {
                ...state,
                loading:true,
            }
        }
        case actionType.FETCH_ORDER_SUCCESS:{
            return {
                ...state,
                orders:action.orders,
                loading:false,
            }
        }
        case actionType.FETCH_ORDER_FAIL:{
            return {
                ...state,
                loading:false,
            }
        }
        default:
            return state;
    }
}

export default reducer