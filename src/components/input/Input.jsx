import React from 'react'
import PropTypes from 'prop-types'
import {Button} from '../'
import './input.scss'



function Input({type,placeholder,onChange,value,onClick}) {   

  return (
     <div className='form'>
         <input className='input' value={value} type={type} placeholder={placeholder} onChange={onChange} />
         <Button className={'small'} onClick={onClick}>Enter search</Button>
     </div>
  )
}

Input.propTypes = {
    type:PropTypes.string,
    placeholder:PropTypes.string,
    onChange:PropTypes.func,
    onClick:PropTypes.func
}

export default Input
