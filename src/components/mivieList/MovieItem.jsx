import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from '../'
import PropTypes from 'prop-types'
import apiConfig from '../../api/apiConfig'
import {category} from '../../api/moviesTmBdApi'
import './movie-list.scss'

function MovieItem(props) {
 
  const item =props.item

  console.log(category)  
  const link = `/${category[props.category]}/${item.id}`
  const bg = apiConfig.w500Image(item.poster_path||item.backdrop_path)
  return (
    <Link className='movie__link' to={link}>
     <div className="movie__item" style={{backgroundImage:`url(${bg})`}}>
       <Button>
         <i className='bx bx-play'></i>
       </Button>     
     </div>
     <h3 className='movie__item-title'>{item?.title||item?.name}</h3>
    </Link>
  )
}


MovieItem.propTypes={
  item:PropTypes.object,
  category:PropTypes.string

}

export default MovieItem