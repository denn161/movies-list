import React,{useState,useEffect,useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {Loader, VideoList} from '../../components'
import apiConfig from '../../api/apiConfig'
import { CastList,MovieList } from '../../components'
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
                    <div className="details__content mb-3">
                       <div className="details__content-poster">
                           <div className="details__content-img"
                            style={{backgroundImage:`url(${poster})`}}>                             
                           </div>

                       </div>
                       <div className="details__content-info">
                         <h1 className='details__content-title'>{item?.title||item?.name}</h1>
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
                             <h2 className='cast__title mb-3'>Актесркий состав</h2>
                           </div>
                           <CastList id={id} />
                           
                         </div>
                         
                       </div>
                    </div>
                    <VideoList id={id}/>
                    <div className="section mb-3">
                      <div className="section__header mb-2">
                        <h2>Похожие видео</h2>
                      </div>
                    </div>
                 <MovieList category={category} id={item?.id} type={'similar'}  />
             </div>
          </>
      )}
   
    </>
  )
}

export default Details