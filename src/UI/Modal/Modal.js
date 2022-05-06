import React, { Component } from "react";
import classes from "./Modal.css"
import Aux from "../../Hoc/Aux";
import Checkout from "../Checkout/Checkout";

class Modal extends Component{
    shouldComponentUpdate(prevprops,prevstate){
        return prevprops.show!==this.props.show ||prevprops.children!==this.props.children;
    }

    render(){
        return (
            <Aux>
                <Checkout show={this.props.show} checkoutClick={this.props.checkoutHandler}/>
                <div className={classes.Modal}
                style={
                    {transform:this.props.show?'translateY(0)':'translateY(-200vh)',opacity:this.props.show?'0.9':'0.0'}}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}


export default Modal;