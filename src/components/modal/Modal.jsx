import React,{useState,useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import './modal.scss'



function Modal({active,id,children}) {

  const [trigger, setTrigger] = useState(false)

 
  useEffect(()=>{
   setTrigger(active)

  },[active])

  return (
    <div id={id} className={`modal ${trigger?'active':''}`}>
     {children}       
    </div>
  )
}


Modal.propTypes = {
    active:PropTypes.bool,
    id:PropTypes.string,
    className:PropTypes.string
}

export const ModalContent = (props)=>{
  
    const contentRef = useRef(null)

    const closeModal = ()=>{
     contentRef?.current.parentNode.classList.remove('active')
      if(props.onClose) props.onClose()
    }

    return(
        <div className="modal__content" ref={contentRef}>
              {props.children}
              <div className="modal__content-close" onClick={closeModal}>
                 <i className='bx bx-x'></i>
              </div>
        </div>
    )

}

ModalContent.propTypes={
    onClose:PropTypes.func
}

export default Modal;
