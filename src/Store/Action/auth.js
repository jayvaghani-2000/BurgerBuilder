import * as actionType from "./actionType"
import axios from "axios"

export const auth_Success=(localId,idToken)=>{
    return {
        type:actionType.AUTH_SUCCESS,
        userId:localId,
        idToken:idToken,
    }
}

export const sign_Up_To_Auth=()=>{
    return {
        type:actionType.SIGN_UP_TO_AUTH,
    }
}

export const auth_Fail=(error)=>{
    return {
        type:actionType.AUTH_FAIL,
        error:error
    }
}

export const auth_Processing=()=>{
    return {
        type:actionType.AUTH_PROCESSING
    }
}

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
    return {
        type:actionType.LOGOUT
    }
}
 
export const logoutTokenExpire=(time)=>{
    console.log(time)
    return dispatch=>{
        setTimeout(()=>{    
            dispatch(logout());
        },time*1000)
    }
}

export const auth=(email,password,signUp)=>{
    return dispatch=>{
        let data={email:email,password:password,returnSecureToken:true}
        dispatch(auth_Processing());
        let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo66JECcM3knVa67_mzO_SZYMvAnMUsMw"
        if(!signUp){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo66JECcM3knVa67_mzO_SZYMvAnMUsMw"
        }
        axios.post(url,data).then(response=>{
            console.log(response);
            let expiresInTime=new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expiresIn',expiresInTime);
            localStorage.setItem('userId',response.data.localId);
            dispatch(auth_Success(response.data.localId,response.data.idToken));
            dispatch(logoutTokenExpire(response.data.expiresIn))
        }).catch(err=>{console.log(err.response);
            console.log(err)
        dispatch(auth_Fail(err.response.data.error))})
    }
}
 
export const onReload=()=>{
    return dispatch=>{
        let newExpiresIn=new Date(localStorage.getItem("expiresIn")).getTime()-new Date().getTime();
        console.log(newExpiresIn)
        if(localStorage.getItem("token")){
            if(newExpiresIn>0){
                dispatch(auth_Success(localStorage.getItem("userId"),localStorage.getItem("token")));
                dispatch(logoutTokenExpire(newExpiresIn/1000));   
            }
        }
        else{
            dispatch(logout());
        }
    }
}