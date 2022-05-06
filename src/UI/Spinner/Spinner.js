import React from "react";
import classes from "./Spinner.css"

const Spinner=(props)=>{
    return <div className={classes.Loader}
    style={props.loading?{}:{marginTop:"500px"}}>Loading...</div>
}

export default Spinner;