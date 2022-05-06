import * as actionType from "./../Action/actionType"
import updateState from "./utility"

let initialState={
    userId:null,
    idToken:null,
    error:null,
    loading:false,
    signUp:false
}



let reducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionType.AUTH_PROCESSING:
            return updateState(state,{loading:true,error:null});
        case actionType.AUTH_SUCCESS:
            return updateState(state,{loading:false,idToken:action.idToken,userId:action.userId,error:null})
        case actionType.AUTH_FAIL:
            return updateState(state,{loading:false,error:action.error})
        case actionType.LOGOUT:
            return updateState(state,{loading:false,idToken:null,userId:null,signUp:false})
        case actionType.SIGN_UP_TO_AUTH:
            return updateState(state,{signUp:true})
        default:
            return state
    }
}

export default reducer;