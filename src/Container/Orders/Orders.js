import React,{Component} from "react";
import classes from "./Orders.css";
import Order from "../../Component/Orders/Order/Order";
import axios from "../../axiosOrder";
import Spinner from "../../UI/Spinner/Spinner";
import * as action from "../../Store/Action/index"
import { connect } from "react-redux"
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";
// import { Redirect } from "react-router-dom";

class Orders extends Component{
    componentDidMount(){
        if(localStorage.getItem('token'))
        {   
            this.props.fetch_start(localStorage.getItem('token'),localStorage.getItem('userId'));
        }
        else
        {
            this.props.fetch_start(this.props.token,this.props.userId)
        }
    }    
    render(){
        console.log(this.props.order)

        let orders=this.props.order.map((item)=>{
            return <Order key={item[0]} ingredients={item[1]} price={item[2]}/> 
        })
        if(this.props.loading){
            orders=<Spinner />
        }
        return (
            <div className={classes.Orders}>
                {orders}
            </div>    
        );
    }
}
const mapStateToProps=state=>{
    return {
        order:state.ord.orders,
        loading:state.ord.loading,
        token:state.auth.idToken,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        fetch_start:(token,userId)=>{dispatch(action.fetch_order_start(token,userId))},
        reload:()=>dispatch(action.onReload())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));