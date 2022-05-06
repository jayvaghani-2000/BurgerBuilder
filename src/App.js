import React, { Component } from 'react';
import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
import Layout from './Component/Layout/Layout';
import { Route,Redirect,Switch } from 'react-router-dom';
// import Checkout from './Container/Checkout/Checkout';
// import Orders from './Container/Orders/Orders';
// import Auth from './Container/Auth/Auth';
import Logout from './Container/Auth/Logout/Logout';
import * as action from "./Store/Action/index";
import { connect } from 'react-redux';
import asyncComponent from './Hoc/asyncComponent/asyncComponent';

let checkout=asyncComponent(()=>{
  return import('./Container/Checkout/Checkout');
})
let orders=asyncComponent(()=>{
  return import('./Container/Orders/Orders');
})
let auth=asyncComponent(()=>{
  return import('./Container/Auth/Auth');
})

class App extends Component {
  componentDidMount(){
    this.props.onReload();
  }

  render() {
    let routes=(
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={checkout}/>
        <Route path="/orders" component={orders}/>
        <Route path="/auth" component={auth}/>
        <Route path="/logout" component={Logout}/>
        <Redirect to="/"/>
      </Switch>
    )     
    if(!this.props.isAuth){
      routes=(<Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={auth}/>
        <Redirect to="/"/>
      </Switch>)
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps=state=>{
  return {
    isAuth:state.auth.idToken!==null,
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    onReload:()=>{dispatch(action.onReload())},
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
