import React,{useState,useEffect,useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {Loader} from '../../components'
import apiConfig from '../../api/apiConfig'
import tmbdApi,{category as cate} from '../../api/moviesTmBdApi'

import './details.scss'


function Details() {

  const [item,setItem] = useState([])

  const [loading,setLoading]=useState(false)

 const {id,category}=useParams() 


 const getDetailsMovie = useCallback(async()=>{    
   
   const params ={language:'ru'}
  try { 
    setLoading(true)    
    const {data}=await tmbdApi.detailsMovies(category,id,{params})
    setItem(data)
    setLoading(false)
    window.scrollTo(0,0)
    console.log(data)

    
  } catch (error) {
    console.log(error.message)
    setLoading(false)
    
  }

 },[category,id])

 useEffect(()=>{
  getDetailsMovie()

 },[getDetailsMovie])

 const bg=apiConfig.originalImage(item.backdrop_path || item.poster_path)

 const poster = apiConfig.originalImage(item.poster_path||item.backdrop_path)
  
 

  if(loading) return <Loader/>

  return (
    
    <>
      {item&& (
          <>
            <div className=" details__banner mb-3" style={{backgroundImage:`url(${bg}`}}></div>
             <div className="container mb-3">
                    <div className="details__content">
                       <div className="details__content-poster">
                           <div className="details__content-img"
                            style={{backgroundImage:`url(${poster})`}}>                             
                           </div>

                       </div>
                       <div className="details__content-info">
                         <div className='details__content-title'>{item?.title||item?.name}</div>
                         <div className='details__content-release'>
                           <span className='details__content-date'>Date release:</span>
                           <span style={{fontSize:'20px'}}>{item?.release_date}</span> </div>
                         <div className='details__content-genres'>
                           {item?.genres?.slice(0,5).map((genre)=>
                             <span key={genre?.id} className='details__content-genre'>{genre.name}</span>  
                           )}
                         </div>
                         <p className='details__content-text'>{item?.overview}</p>
                         <div className="cast">
                           <div className="section__header">
                             <h2>Cast</h2>
                           </div>
                           
                         </div>
                         
                       </div>
                    </div>
             </div>
          </>
      )}
   
    </>
  )
}

export default Details