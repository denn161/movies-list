import React from 'react'
import {Routes,Route} from 'react-router-dom'
import {HomePage,Catalog,Details} from '../'

function Routers() {
  return (    
     <Routes>
     <Route path='/' element={<HomePage/>}/>
     <Route path='/:category/:id' element={<Details/>}/>
     <Route path='/:category/search/:keyword' element={<Catalog/>}/>
     <Route path='/:category' element={<Catalog/>}/>
     </Routes>    
     
   
  )
}

export default Routers