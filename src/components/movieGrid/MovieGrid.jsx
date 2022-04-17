import React,{useEffect,useState,useCallback} from 'react'
import PropTypes from 'prop-types'
import {MovieItem} from '../'

import tmbdApi,{category as cate,movieType,tvType} from '../../api/moviesTmBdApi'
import { useParams } from 'react-router-dom'

  
function MovieGrid({category}) {

 const [items,setItems]=useState([])

 const [page,setPage]=useState(1)

 const [totalPage,setTotalPage]=useState(0)

 const {keyword}=useParams()

 const getMovieType = useCallback(async ()=>{

    let response;
  try {

    if(!keyword){
        const params={language:'ru'}
       switch (category) {

           case cate.movie:

           response =await tmbdApi.getMoviesList(movieType.upcoming,{params})               
               break;
       
           default:
               response =await tmbdApi.gettvList(tvType.popular,{params})
       }
    }else{
       const params={query:keyword,language:'ru'}

       response =await tmbdApi.searchVideos(category,{params})

    }    

    setItems(response.data.results)
    setTotalPage(response?.data?.total_pages)
   

      
  } catch (error) {
      console.log(error.message)
  }


 },[category,keyword])

 useEffect(()=>{

    getMovieType()
 },[getMovieType])
 
  
 const loadMore = async()=>{
     let response;

    try {
      if(!keyword){
          const params={language:'ru',page:page+1}
          switch (category) {
            case cate.movie:
                response =await tmbdApi.getMoviesList(movieType.upcoming,{params})               
                    break;
            
                default:
                    response =await tmbdApi.gettvList(tvType.popular,{params})
          }
      }else{

        const params={page:page+1,query:keyword}

        response =await tmbdApi.searchVideos(category,{params})
      }

      setItems([...items,...response.data.results])
      setPage(page+1)
    

        
    } catch (error) {
        console.log(error.message)
        
    }
 }  
    

  return (
    <div className='movie__grid'>


    </div>
  )
}



MovieGrid.propTypes = {
category:PropTypes.string
}

export default MovieGrid
