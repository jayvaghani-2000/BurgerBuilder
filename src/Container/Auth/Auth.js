import React,{ Component } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./Auth.css"
import { connect } from "react-redux";
import { Redirect,Switch } from "react-router-dom";
import * as action from "./../../Store/Action/index"

export class Auth extends Component {
    state={
        signUp:true,
        authForm:{
            email: {
                touch: false,
                elementType: "input",
                elementConfig: {
                    placeholder: "Mail Address",
                    type: "email",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                shouldValidate: true,
                valid: false
            },
            
            password: {
                touch: false,
                elementType: "input",
                elementConfig: {
                    placeholder: "Password",
                    type: "password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength:6,
                },
                shouldValidate: true,
                valid: false
            }
        },
    }

    submitHandler=(event)=>{
        event.preventDefault();
        this.props.auth(this.state.authForm.email.value,this.state.authForm.password.value,this.state.signUp); 
    
    }

    checkValidity = (validation, value) => {
        // console.log(validation)
        let isValid = true;

        if (validation.required) {
            isValid = (value.trim() !== "") && isValid;
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

    changedHandler = (event, identifier) => {
        let formOrder = { ...this.state.authForm }
        let updateElement = { ...formOrder[identifier] }
        updateElement.value = event.target.value;
        if (updateElement.touch !== undefined)
            updateElement.touch = true;
        if (updateElement.valid !== undefined)
            updateElement.valid = this.checkValidity(updateElement.validation, updateElement.value);
        let checkForDisabled = {};
        // debugger
        for (let key in this.state.authForm) {
            if (key === identifier) {
                checkForDisabled[key] = updateElement.valid;
            }
            else {
                if (this.state.authForm[key].valid === false) {
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
            authForm: formOrder
        })
    }

    toggleSignUpIn=()=>{
        this.setState(prevState=>{
            return {signUp:!prevState.signUp}
        })
    }

    render(){
        let formElement = [];
        for (let key in this.state.authForm) {
            formElement.push({ id: key, element: this.state.authForm[key] })
        }
        let error=null;
        if(this.props.error){
            error=<p>{this.props.error.message}</p>
        }
        let spinner = (<form  onSubmit={this.submitHandler}>
            {error}
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
            <Button btnType="Success" >SUBMIT</Button>
            <hr/>
            

        </form>)

        if(this.props.loading){
            spinner=<Spinner loading={true}/>
        }
        let redirectWhenAuthenticate=null;
        console.log(this.props.token)
        if(this.props.isAuth){
            redirectWhenAuthenticate=<Redirect to="/"/>
        }
        let authToCheckout=null;
        console.log(this.props.isAuth)
        console.log(this.props.signUp)
        if(this.props.isAuth && this.props.signUp){
            authToCheckout=<Redirect to="/checkout"/>
            console.log("RUN")
        }
        return (
            <div className={classes.Auth}>
                {spinner}
                <Button btnType="Danger" proceed={this.toggleSignUpIn}>Switch to {this.state.signUp?'signIn':'signUp'}</Button>

                <Switch>
                    {authToCheckout}
                    {redirectWhenAuthenticate}
                </Switch>
            </div>
        );
    }

}

const mapDispatchToProps=dispatch=>{
    return {
        auth:(email,password,signUp)=>{dispatch(action.auth(email,password,signUp))}
    }
}
const mapStateToProps=state=>{
    return {
        token:state.auth.idToken,
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.idToken!==null,
        signUp:state.auth.signUp,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);