 import React from 'react'
 import PropTypes from 'prop-types'
 import './button.scss'

 
 
 const Button=({onClick,className,children})=> {

    
   return (
      <button className={`btn ${className}`} onClick={onClick}>
       {children}
      </button>
   )
 }


 export const OutlineButton = props=>{

    return(
        <Button className={`btn-outline ${props.className}`} onClick={props.onClick?()=>props.onClick():null} >
          {props.children}
        </Button>
    )
 }

 
 Button.propTypes = {
     onClick:PropTypes.func,
     className:PropTypes.string,
     children:PropTypes.string
 }
 
 export default Button;
 