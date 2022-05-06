import React,{ Component } from "react";
import CheckoutSummary from "../../Component/Orders/CheckoutSummary";
import { Route,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component{
   
    render(){
        console.log(this.props.ingredients)
        let summary=<Redirect to="/"/>
        if(this.props.ingredients){
            summary=(<div>
                    <CheckoutSummary ingredients={this.props.ingredients}/>
                <Route path={this.props.match.url+"/contact"} render={()=>{return(<ContactData ingredients={this.props.ingredients} price={this.props.totalPrice}/>)}}/>
            </div>)
        }
        return summary;
    }
}

let stateMapToProp=state=>{
    return {
        ingredients:state.bur.ingredients,
        totalPrice:state.bur.totalPrice,
    }
}

export default connect(stateMapToProp)(Checkout);