import * as actionType from "./actionType"
import axios from "./../../axiosOrder"

export const burger_Purchase_Success=(orderId,orderData)=>{
   return {
       type:actionType.BURGER_PURCHASE_SUCCESS,
       orderId:orderId,
       orderData:orderData
   }
} 
export const burger_Purchase_Fail=(error)=>{
   return {
       type:actionType.BURGER_PURCHASE_FAIL,
       error:error
   }
}

export const burger_Purchase_Processing=()=>{
    return {
        type:actionType.BURGER_PURCHASE_PROCESSING,
    }
}

//Post the data from server if authenticated
export const burger_Purchase_State=(orderData,history,token)=>{

    return dispatch=>{
        dispatch(burger_Purchase_Processing());
        axios.post("/orders.json?auth="+token, orderData).then(res => {
        // console.log("Success");
        // console.log(res);
        dispatch(burger_Purchase_Success(res.data,orderData));
        history.replace("/");
    }).catch(error => {
        burger_Purchase_Fail(error);
    })
    }

}

export const fetch_order_success=(orders)=>{
    return {
        type:actionType.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}

export const fetch_order_fail=(error)=>{
    return {
        type:actionType.FETCH_ORDER_FAIL,
        error:error
    }
}

export const fetch_order_processing=()=>{
    return {
        type:actionType.FETCH_ORDER_PROCESSING,
    }
}

//get the data from server if authenticated
export const fetch_order_start=(token,userId)=>{
    return dispatch=>{
        dispatch(fetch_order_processing());
        // console.log(userId)
        if(token){
            let queryParam='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        
            axios.get("/orders.json"+queryParam).then(res=>{
                // console.log(res);
                let data=res["data"];
                // console.log(data);
                let ingredients=[];
                for(let item in data){
                    // console.log(data[item].ingredients);
                    ingredients.push([item,data[item].ingredients,data[item].price]);
                }
                dispatch(fetch_order_success(ingredients))
            }).catch(err=>{
                dispatch(fetch_order_fail(err))
        })}
    }
}
 
