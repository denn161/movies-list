import React from 'react'
import { useParams } from 'react-router-dom'
import './catalog.scss'

function Catalog() {

 const {category}=useParams()

 console.log(category)

  return (
    <div>Catalog</div>
  )
}

export default Catalog