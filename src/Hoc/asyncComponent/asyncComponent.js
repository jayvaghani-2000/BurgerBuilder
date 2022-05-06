import React, {Component} from "react";

const asyncComponent=(importedCmp)=>{
    return class extends Component{
        state={
            component:null,
        }
        //let now set component in state
        componentDidMount(){
            importedCmp().then((cmp)=>{
                this.setState({component:cmp.default});
            })
        }
        render(){
            let C=this.state.component;
            return C?<C {...this.props}/>:null;
        }
    }
}

export default asyncComponent;