import React from 'react'
import { Link } from 'react-router-dom'
// import { Button} from '../../components'
import { MovieList } from '../../components'
import { OutlineButton } from '../../components/button/Button'
import {HeroSlide} from '../../components'
import {category,movieType,tvType} from '../../api/moviesTmBdApi'


const sectionContents=[
  {
    title:'Trending Movies',
    category:category.movie,
    type:movieType.popular
  },

  {
    title:'Top Rated Movies',
    category:category.movie,
    type:movieType.top_rated
  },

  {
    title:'Trending TV',
    category:category.tv,
    type:tvType.popular
    
  },
  {
    title:'Top Rated TV',
    category:category.tv,
    type:tvType.top_rated
  }

]

const Section = ({title,category,type})=>(
  <div className="section mb-3">
  <div className="section__header mb-2">
    <h2 style={{cursor:'pointer'}} className='hover'>{title}</h2>
    <Link to={category}><OutlineButton>View more</OutlineButton></Link>
  </div>
  <MovieList category={category} type={type}/>
  </div>   

)

function HomePage() {
  return (
   <>
 <HeroSlide/>
 <div className="container">
   {sectionContents.map(({title,category,type})=>
      <Section title={title} category={category} type={type}/>
   )}
 </div>
   </>
  )
}

export default HomePage