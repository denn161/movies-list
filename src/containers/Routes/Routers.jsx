import React from 'react'
import {Routes,Route} from 'react-router-dom'
import {HomePage,Catalog,Details} from '../'

function Routers() {
  return (    
     <Routes>
     <Route path='/' element={<HomePage/>}/>
     <Route path='/:ctegory/:id' element={<Details/>}/>
     <Route path='/:category/search/:keyword' element={<Catalog/>}/>
     <Route path='/:ctegory' element={<Catalog/>}/>
     </Routes>    
     
   
  )
}

export default Routers