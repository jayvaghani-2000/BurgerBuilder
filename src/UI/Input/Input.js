import React from "react";
import classes from "./Input.css"

const Input=(props)=>{
    let inputElement=null;
    let classList=[classes.InputElement];
    if(props.touch && !props.valid && props.shouldValidate){
        classList.push(classes.Invalid)
    }
    switch(props.elementType){
        case "input":
            inputElement=<input className={classList.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case "textarea":
            inputElement=<textarea className={classList.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break; 
        case "select":
            inputElement=<select className={classList.join(" ")} value={props.value} onChange={props.changed}>
                {props.elementConfig.option.map(ele=>{
                    return <option key={ele.value} value={ele.value} >{ele.showValue}</option>
                })}
                {/* <option value={}></option> */}
            </select>
            break;
        default:
            inputElement=<input className={classList.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed}/>            
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input