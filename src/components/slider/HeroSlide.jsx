import React,{useCallback, useEffect,useRef,useState} from 'react'

import { useNavigate } from 'react-router-dom';

import SwiperCore, {Autoplay} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Button} from '../'
import { OutlineButton } from '../button/Button';

import tmbdApi,{movieType,tvType,category} from '../../api/moviesTmBdApi'

import apiConfig from '../../api/apiConfig'
import './slider.scss'
import {Modal} from '../';
import {ModalContent} from '../modal/Modal'


function HeroSlide() {

const [movieItems, setMovieItems] = useState([])
 SwiperCore.use([Autoplay])

  const getMovies = useCallback(async()=>{
       try {          
        const params ={page:1,language:'ru'}

        const response = await tmbdApi.getMoviesList(movieType.popular,{params})
          console.log(response)
          setMovieItems(response.data.results?.slice(0,8))
        
       } catch (error) {
           console.log(error.message)
       } 
  },[])

  

  useEffect(()=>{
      getMovies()

  },[getMovies])


  return (
     <div className="hero__slide">
          <Swiper  grabCursor={true} spaceBetween={5} slidesPerView={1}>
            {movieItems?.map((item)=>{
               if(item?.overview||item?.poster_path){
                 return  <SwiperSlide key={item?.id}>
                {({isActive})=>(
                
                    <HeroSlideItem item={item} className={isActive?'active':''}/>
                  
                )}
            </SwiperSlide>
               }

            }
                
            )}

            </Swiper>
            {movieItems?.map((item,i)=>{
              return <TrailerModal key={i+1} item={item}/>                
            })}
     </div>
  )
}

const HeroSlideItem =({item,className})=>{

 const navigate =useNavigate()

 const background = apiConfig.originalImage(item?.backdrop_path?item?.backdrop_path:item?.poster_path) 

  const setModalActive =  async ()=>{
    
  const modal = document.querySelector(`#modal_${item?.id}`)
       
  const {data} = await tmbdApi.getVideos(category.movie,item?.id)
   console.log(data.results[0].key)

      if(data.results?.length){

      const videoSrc = `https://www.youtube.com/embed/${data?.results[0].key}`
      
      modal.querySelector('.modal__content > iframe').setAttribute('src',videoSrc)
  
     
   }else{
       modal.querySelector('.modal__content').innerHTML='No trailer'

   }

   modal.classList.add('active')

 }

 return(
     <div className={`hero__slide-item ${className}`} style={{backgroundImage:`url(${background})`}}>
         <div className="hero__slide-content">
             <div className="hero__slide-info">
               <h2 className='hero__slide-title'>{item?.title}</h2>
               <div className="hero__slide-overview">{item?.overview}</div>
               <div className="hero__slide-btns">
                   <Button onClick={()=>navigate(`/movie/${item?.id}`)}>Watch now</Button>
                   <OutlineButton onClick={setModalActive}  >Watch trailer</OutlineButton>
               </div>              
             </div>
             <div className="hero__slide-poster">
                 <img src={apiConfig.w500Image(item?.poster_path)} alt="posterPhoto" />
             </div> 

         </div>
     </div>
 )

}

const TrailerModal = ({item})=>{

    const iframeRef = useRef(null)

    const onClose =()=>iframeRef?.current.setAttribute('src','')


    return(
        <Modal active ={false} id={`modal_${item?.id}`}>
         <ModalContent onClose={onClose}>
             <iframe ref={iframeRef} width='100%' height={'500px'} title='trailer'></iframe>
             </ModalContent>  
        </Modal>
    )

 

 

}



export default HeroSlide