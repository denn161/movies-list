import React from 'react'

import {footerBg} from '../../constants'

import './pageheader.scss'



function PageHeader({children}) {
 


  return (
    <div className='page__header' style={{backgroundImage:`url(${footerBg})`}}>
        <h2>{children}</h2>
    </div>
  )
}

export default PageHeader