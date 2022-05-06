import React, { Component } from "react";
import classes from "./ContactData.css"
import Button from "../../../UI/Button/Button";
import axios from "../../../axiosOrder";
import withErrorHandler from "../../../Hoc/withErrorHandler/withErrorHandler";
import { withRouter } from "react-router-dom";
import Spinner from "../../../UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";
import { connect } from "react-redux";
import * as actionList from "../../../Store/Action/order" 

class ContactData extends Component {
    state = {
        orderBtn: true,
        orderForm: {
            name: {
                touch: false,
                elementType: "input",
                elementConfig: {
                    placeholder: "Your Name",
                    type: "text",
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                shouldValidate: true,
            },
            email: {
                touch: false,
                elementType: "input",
                elementConfig: {
                    placeholder: "Your Email",
                    type: "text",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                shouldValidate: true,
                valid: false
            },
            street: {
                touch: false,
                elementType: "input",
                elementConfig: {
                    placeholder: "Street",
                    type: "text",
                },
                value: "",
                validation: {
                    required: true
                },
                shouldValidate: true,
                valid: false,
            },
            postalCode: {
                touch: false,
                elementType: "input",
                elementConfig: {
                    placeholder: "ZIP Code",
                    type: "text",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                shouldValidate: true,
                valid: false,
            },
            deliveryMode: {
                elementType: "select",
                elementConfig: {
                    option: [{ value: "fastest", showValue: "Fastest" }, { value: "cheapest", showValue: "Cheapest" }]
                },
                shouldValidate: false,
                value: "fastest"
            },
        },
        loading: false
    }

    checkValidity = (validation, value) => {
        // console.log(validation)
        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (validation.minLength) {
            isValid = value.trim().length >= validation.minLength && isValid;
        }

        if (validation.maxLength) {
            isValid = value.trim().length <= validation.maxLength && isValid;
        }
        if (validation.isEmail) {
            let pattern=/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients)
        let orderDetail = {};

        for (let key in this.state.orderForm) {
            orderDetail[key] = this.state.orderForm[key].value;
        }

        // this.setState({ loading: true })
        let data = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            orderDetail: orderDetail,
            userId:this.props.userId,
        }
        console.log(data.orderDetail.name)
        this.props.orderBurger(data,this.props.history,this.props.token);
        // this.props.history.push("/");
    }

    changedHandler = (event, identifier) => {
        let formOrder = { ...this.state.orderForm }
        let updateElement = { ...formOrder[identifier] }
        updateElement.value = event.target.value;
        if (updateElement.touch !== undefined)
            updateElement.touch = true;
        if (updateElement.valid !== undefined)
            updateElement.valid = this.checkValidity(updateElement.validation, updateElement.value);
        let checkForDisabled = {};
        // debugger
        for (let key in this.state.orderForm) {
            if (key === identifier) {
                checkForDisabled[key] = updateElement.valid;
            }
            else {
                if (this.state.orderForm[key].valid === false) {
                    checkForDisabled[key] = false
                }
                else {
                    checkForDisabled[key] = true
                }
            }
        }
        // console.log(checkForDisabled)
        if (checkForDisabled.name === true && checkForDisabled.email === true && checkForDisabled.street === true && checkForDisabled.postalCode === true) {
            checkForDisabled = false
        }
        else {
            checkForDisabled = true
        }


        // console.log(checkForDisabled)
        // console.log(updateElement)
        formOrder[identifier] = updateElement;
        this.setState({
            orderForm: formOrder, orderBtn: checkForDisabled
        })
    }

    render() {
        let formElement = [];
        for (let key in this.state.orderForm) {
            formElement.push({ id: key, element: this.state.orderForm[key] })
        }

        let spinner = (<form onSubmit={this.orderHandler}>
            {formElement.map(element => {
                return <Input label={element.id}
                    key={element.id}
                    elementType={element.element.elementType}
                    elementConfig={element.element.elementConfig}
                    value={element.element.value}
                    changed={(event) => this.changedHandler(event, element.id)}
                    valid={element.element.valid}
                    shouldValidate={element.element.shouldValidate}
                    touch={element.element.touch} />
            })}
            <Button btnType="Success" disabled={this.state.orderBtn}>ORDER</Button>
        </form>)
        if (this.props.loading) {
            spinner = <Spinner loading={true} />
        }
        return (
            <div className={classes.ContactData}>
                Fill details
                {spinner}
            </div>
        );
    }
}

const stateMapToProp=(state)=>{
    return {
        loading:state.ord.loading,
        token:state.auth.idToken,
        userId:state.auth.userId
    }
}

const actionMapToProp=(dispatch)=>{
    return {
        orderBurger:(orderData,history,token)=>{dispatch(actionList.burger_Purchase_State(orderData,history,token))
        }
    }
}


export default connect(stateMapToProp,actionMapToProp)(withRouter(withErrorHandler(ContactData, axios)));
