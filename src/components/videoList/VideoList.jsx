import React,{useCallback,useState,useEffect, useRef} from 'react'

import tmbdApi from '../../api/moviesTmBdApi'

import apiConfig from '../../api/apiConfig'
import { YOUTUBE } from '../../constants'

import './index.scss'
import { useParams } from 'react-router-dom'

function VideoList({id}) {

const [videos,setVideos]=useState([])

const {category}=useParams()    



const getVideos =useCallback(async()=>{
        try {

        const {data}=await tmbdApi.getVideos(category,id)

        console.log(data.results)   
        
        setVideos(data.results)


        } catch (error) {
            console.log(error.message)            
        }

   },[category,id])

    useEffect(()=>{

     getVideos()

    },[getVideos]) 

  
  return (
   <div className='video__list mb-3'>
   {videos?.map((item)=>
      <VidoeItem   item={item} key={item?.id}/>
   )}
   
   </div>
  )
}




const VidoeItem = ({item})=>{

    const iframeRef=useRef(null)


    useEffect(()=>{

        const height = iframeRef.current.offsetWidth*9/16 +'px'
        iframeRef.current.setAttribute('height',height)
    },[])
   
   return (
    <div className='vidoe__item'> 
     <div className="video__item-name mb-3">
         <h2>{item?.name}</h2>
     </div>
     <iframe   src={`${YOUTUBE}/${item?.key}`}ref={iframeRef} width="100%" title='video' ></iframe>
    </div>
   )
   
}

export default VideoList