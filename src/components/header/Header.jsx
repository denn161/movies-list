import React, { useRef,useEffect } from 'react'
import { Link,useLocation } from 'react-router-dom'

import {logo} from '../../constants'

import './header.scss'


const headerNav = [
  {
    display:'Home',
    path:'/'
  },
  {
    display:'Movies',
    path:'/movie'
  },
 
  {
    display:'TV Series',
    path:'/tv'
  }
]

function Header() {

  const {pathname} =useLocation()
  console.log(pathname)
  const headerRef = useRef(null)
  const active = headerNav.findIndex((e)=>e.path===pathname)



  useEffect(() => {
    
   const shrinkHeader =()=>{

    if(document.body.scrollTop>100||document.documentElement.scrollTop>100){
      headerRef.current.classList.add('shrink')
    }else{

      headerRef.current.classList.remove('shrink')
    }
   }

   window.addEventListener('scroll',shrinkHeader)

  
    return () => {
   window.removeEventListener('scroll',shrinkHeader)
    }
  }, [])
  
  return (
     <div ref={headerRef} className='header'>
       <div className="container">
        <div className="header__inner">
        <div className="header__logo">
            <img className='header__logo-img' src={logo} alt="logo" /> 
            <Link className='header__logo-text hover' to={'/'}>MoviesList</Link> 
        </div>
         <nav className='header__nav'>
           <ul className="header__nav-list">
             {headerNav.map(({display,path},i)=>
             <li className={`${i===active?'active':'header__nav-item'}`} key={display}>
               <Link className='header__nav-link' to={path}>{display}</Link></li>)}
           </ul>           
         </nav>
         </div>          
       </div>
     </div>
  )
}

export default Header