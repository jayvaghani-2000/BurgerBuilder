import React from "react";
import classes from './Button.css';

const Button=(props)=>{
    // console.log(props["btnType"])
    let classList=[classes.Button, classes[props.btnType]].join(' ');
    // console.log(classList)
    return (
        <button 
        className={classList}
        onClick={props.proceed} disabled={props.disabled}>{props.children}</button>
    );
};

export default Button;
