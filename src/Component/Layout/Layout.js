import React,{ useState,useEffect } from "react";
import Aux from '../../Hoc/Aux';
import classes from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import { Redirect } from "react-router-dom";
// import './Layout.css'
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";


const Layout=(prop)=>{
    const [state,modifyState]=useState({checkout:false,redirect:false});

    useEffect(()=>{
        if(state.redirect){
            modifyState((prevState)=>{
                return {checkout:prevState.checkout,redirect:false}
            })
        }
    })

    let sideDrawerCheckoutHandler=()=>{
        modifyState({checkout:false})
    }

    let toogleSideDrawerHandler=()=>{
        modifyState((prevState)=>{
            return {checkout:!prevState.checkout,redirect:prevState.redirect}
        })
    } 
    
    
    let redirectToHome=()=>{
        modifyState((prevState)=>{
            return {checkout:prevState.checkout,redirect:true}
        })
    }


    return (
        <Aux>
            <Toolbar toggle={toogleSideDrawerHandler} redirectToHome={redirectToHome}/>
            <SideDrawer show={state.checkout} checkoutHandler={sideDrawerCheckoutHandler} toggle={toogleSideDrawerHandler}/>
            <main className={classes.Content}>{prop.children}</main>
            {state.redirect?<Redirect to="/"/>:null}
        </Aux>
    );
}

export default Layout;