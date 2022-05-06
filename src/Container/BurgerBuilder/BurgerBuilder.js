import React, { Component } from "react";
import Aux from "../../Hoc/Aux";
import Burger from "../../Component/Burger/Burger";
import BuildControls from "../../Component/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Component/Burger/OrderSummary/OrderSummary";
import axios from "../../axiosOrder";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionList from "../../Store/Action/index";


class BurgerBuilder extends Component {

    state = {
        // ingredients:null,
        // totalPrice:2,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {

        if(this.props.ingredients===null){ 
        this.props.onMount();
        }
        if(this.props.ingredients!==null)
        this.updatePuchaseState(this.props.ingredients)

        axios.get("/ingredients.json").then(res => {
            if (res.data.salad !== 0 || res.data.bacon !== 0 || res.data.meat !== 0 || res.data.cheese !== 0) { this.setState({ purchasable: true }) }
        }).catch(err => console.log(err));

    }

    checkoutHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        let queryParam = [];
        for (let item in this.props.ingredients) {
            queryParam.push(encodeURIComponent(item) + "=" + encodeURIComponent(this.props.ingredients[item]));
        }
        let stringParam = queryParam.join("&");
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + stringParam + "&price=" + this.props.totalPrice
        });
    
    }

    purchaseHandler = () => {
        if(this.props.isAuth)
        {this.setState({ purchasing: true })}
        else{
        this.props.history.push("/auth");
        this.props.sign_Up_To_Auth();}

    }

    updatePuchaseState = (ingredients) => {
        // let ingredients={...this.state.ingredients};
        let sum = Object.keys(ingredients).map((item) => { return ingredients[item] }).reduce((add, ele) => { return add + ele }, 0);
        this.setState({ purchasable: sum > 0 });
    };


    render() {

        let disabledBtn = { ...this.props.ingredients };
        for (let item in disabledBtn) {
            disabledBtn[item] = disabledBtn[item] === 0;
        }
        let burger = <Spinner loading={this.state.loading} />;
        if (this.props.ingredients) {
            burger = <Aux><Burger ingredients={this.props.ingredients} />
                <BuildControls
                    // itemAdded={this.addItemHandler}
                    itemAdded={this.props.add_item}
                    // itemRemoved={this.removeItemHandler}
                    itemRemoved={this.props.remove_item}
                    disableData={disabledBtn}
                    currentAmount={this.props.totalPrice}
                    purchasable={this.state.purchasable}
                    isAuth={this.props.isAuth}
                    buying={this.purchaseHandler}
                    updatePurchaseable={this.updatePuchaseState} /></Aux>
        }
        // console.log(disabledBtn);
        // this.updatePuchaseState(this.props.ingredients);
        return (
            <Aux>
                <Modal show={this.state.purchasing} checkoutHandler={this.checkoutHandler}>
                    {this.state.loading ? <Spinner loading={this.state.loading} /> : <OrderSummary ingredients={this.props.ingredients}
                        price={this.props.totalPrice}
                        purchaseCancelled={this.checkoutHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                    />}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

let stateMapToProp = state => {
    return {
        ingredients: state.bur.ingredients,
        totalPrice: state.bur.totalPrice,
        isAuth:state.auth.idToken!=null
    }
}

let actionMapToProp = dispatch => {
    return {
        add_item: (itemType) => dispatch(actionList.add_Item(itemType)),
        remove_item: (itemType) => dispatch(actionList.remove_Item(itemType)),
        onMount: () => { dispatch(actionList.fetch_Ingredients()); },
        sign_Up_To_Auth:()=>{dispatch(actionList.sign_Up_To_Auth())}
    }
}


export default connect(stateMapToProp, actionMapToProp)(withErrorHandler(BurgerBuilder, axios));