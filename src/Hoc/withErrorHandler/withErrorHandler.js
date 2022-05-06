import React, { Component } from "react";
import Modal from "../../UI/Modal/Modal";
import Aux from "../Aux"

let withErrorHandler=(WrappedCmp,axios)=>{

    
    return (
        class extends Component{
            constructor(props){
                super(props);
                // console.log("withErrorHandler executed")
                this.reqInterceptor=axios.interceptors.request.use(req=>{
                    this.setState({hasError:null})
                    return req;
                },error=>{
                    this.setState({hasError:error});
                    console.log("Error occured");
                    return error
                });
                this.resInterceptor=axios.interceptors.response.use(res=>res,error=>{this.setState({hasError:error})
                console.log(error.name);
                console.log(error);
                return error;
                }); 
            }
            state={
                hasError:null,
            }
            componentWillUnmount(){
                axios.interceptors.response.eject(this.resInterceptor);
                axios.interceptors.request.eject(this.reqInterceptor);
            }

            // componentDidMount(){
            //     axios.interceptors.response.use(res=>res,error=>{this.setState({hasError:error})
            //     console.log(error.name);
            //     console.log(error);
            //     return error;
            //     });
            //     axios.interceptors.request.use(req=>{
            //         this.setState({hasError:null})
            //         return req;
            //     },err=>{
            //         this.setState({hasError:err});
            //         console.log("Error occured");
            //         return err});
            // }

            checkhandler=()=>{
                this.setState({hasError:null});
            }

            render(){
                return (<Aux>
                    <Modal show={this.state.hasError}
                    checkoutHandler={this.checkhandler}
                    >{this.state.hasError?this.state.hasError.message:null}</Modal>
                    <WrappedCmp {...this.props}/>
                </Aux>)
            }
        }
    )
}

export default withErrorHandler;