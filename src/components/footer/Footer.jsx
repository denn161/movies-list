import React from 'react'
import { Link } from 'react-router-dom'

import {footerBg,logo} from '../../constants'

import './footer.scss'

const links1 = ['Home','Contact Us','Term of services','About Us']
const links2 =[ {title:'Live',to:'/'},{title:'FAQ',to:'/'},{title:'Premium',to:'/'},{title:'Pravacy policy',to:'/'}]
const links3 =[ {title:'You must watch',to:'/'},{title:'Recent release',to:'/'},{title:'Top IMDB',to:'/'}]

function Footer() {
  return (
     <footer className='footer' style={{backgroundImage:`url(${footerBg})`}}>
         <div className="container">
             <div className="footer">
              <div className="footer__item-logo">
              <div className="footer__logo">
                    <img src={logo} alt="footerLogo" />                   
                </div>
                <Link className='header__logo-text hover' to={'/'}>MiviesList</Link> 
              </div>
              <div className="footer__item-menu">
                   <ul className='footer__item-list'>
                       {links1.map((link,i)=>
                        <li className="footer__list-item" key={i+1}>
                         <Link to={'/'}  className="footer__list-link">{link}</Link>
                        </li>
                       )}
                   </ul>
                   <ul className='footer__item-list'>
                       {links2.map((link,i)=>
                        <li className="footer__list-item" key={i+1}>
                         <Link to={link.to}  className="footer__list-link">{link.title}</Link>
                        </li>
                       )}
                   </ul>
                   <ul className='footer__item-list'>
                       {links3.map((link,i)=>
                        <li className="footer__list-item" key={i+1}>
                         <Link to={link.to}  className="footer__list-link ">{link.title}</Link>
                        </li>
                       )}
                   </ul>
              </div>
             </div>
         </div>
        <div className="copy">
         &copy;2022&nbsp;All rights reserved
        </div>

     </footer>
  )
}

export default Footer