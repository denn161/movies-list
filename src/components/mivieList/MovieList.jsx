
import React,{useState,useEffect,useCallback} from 'react'
import PropTypes from 'prop-types'
import {Swiper,SwiperSlide} from 'swiper/react'
import MovieItem from './MovieItem'
import tmbdApi,{category}  from '../../api/moviesTmBdApi'
import './movie-list.scss'


function MovieList(props) {

  

    const [items,setItems]=useState([])   
     
    

    const getMovieList =useCallback(async()=>{
        let response;
        const params={language:'ru'}
        try {
         if(props.type!=='similar'){
            switch (props.category) {
                case category.movie:
                    response =await tmbdApi.getMoviesList(props.type,{params})                    
                    break;
               case category.tv:
                response = await tmbdApi.gettvList(props.type,{params})
                break;
                default:
                    response = await tmbdApi.gettvList(props.type,{params})
            } 
         }else{
             response=await tmbdApi.similarMovies(props.category,props.id)
         }

          console.log(response.data.results)
         
          setItems(response?.data?.results)
            
        } catch (error) {
            console.log(error.message)
            
        }

    },[props.category,props.id,props.type])

   useEffect(()=>{
    getMovieList()

   },[getMovieList])

  return (
    <div className='movie__list'>
  <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
      {items?.map((item,i)=>{
      
    return  <SwiperSlide key={item?.id}>
          <MovieItem item={item} category={props.category}/>
      </SwiperSlide>


      })}

  </Swiper>

    </div>
  )
}





MovieList.propTypes = {
    category:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    id:PropTypes.string
}

export default MovieList



