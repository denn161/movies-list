import React from 'react'
import { useParams } from 'react-router-dom'

import { PageHeader } from '../../components'
import { category } from '../../api/moviesTmBdApi'
import { MovieGrid } from '../../components'
import './catalog.scss'

function Catalog() {

 const params=useParams()

 console.log(params)

  const title = params.category===category.movie?'Movies':'TV Series'
  
  
  return (
    <>
    <PageHeader>
      {title}
    </PageHeader>
      <div className="container">        
       <MovieGrid category={params.category}/>
      </div>
    </>
    

  
  )
}

export default Catalog