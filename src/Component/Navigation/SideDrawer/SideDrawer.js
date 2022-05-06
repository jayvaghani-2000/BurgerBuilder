import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../Toolbar/NavigationItems/NavigationItems";
import classes from './SideDrawer.css'
import Checkout from '../../../UI/Checkout/Checkout';
import Aux from "../../../Hoc/Aux";

const SideDrawer = (props) => {


        let classList=[classes.SideDrawer,classes.Close];
        if(props.show){
            classList=[classes.SideDrawer,classes.Open]
        }

    return (
        <Aux>
            <Checkout show={props.show} checkoutClick={props.checkoutHandler}/>
            <div className={classList.join(' ')}>
                <div onClick={props.toggle} className={classes.back}><i className={[classes.left,classes.arrow].join(' ')}></i></div>
                <div className={classes.Logo}>
                    <Logo onclick={props.redirectToHome}/>
                </div>
                <nav>
                    <NavigationItems clicked={props.toggle }/>
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;