import React,{ Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../Store/Action/index"
import { Redirect } from "react-router-dom";

class Logout extends Component{
    componentDidMount(){
        this.props.loggingOut()
    }

    render(){
        return  (
            <Redirect to="/"/>
        )
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        loggingOut:()=>{dispatch(action.logout())}
    }
}

export default connect(null,mapDispatchToProps)(Logout)