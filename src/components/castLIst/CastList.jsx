import React,{useState,useEffect, useCallback} from 'react'

import tmbdApi from '../../api/moviesTmBdApi'

import apiConfig from '../../api/apiConfig'


import './index.scss'
import { useParams } from 'react-router-dom'

function CastList({id}) { 

    const {category}=useParams()

    const [casts,setCasts]=useState([])

    const getCredits =useCallback(async()=>{
        try {

        const {data}=await tmbdApi.creditsMovies(category,id,{params:{language:'ru'}})

        console.log(data.cast?.slice(0,5))

        setCasts(data.cast?.slice(0,5))


        } catch (error) {
            console.log(error.message)
            
        }

   },[category,id])

    useEffect(()=>{

     getCredits()

    },[getCredits])  


  return (
    <div className='cast__list'>
     {casts?.map((cast)=>{
        if(cast.profile_path){
            return (
                <div className="cast__item" key={cast?.id}>
                <div className="cast__item-img">
                  <img src={apiConfig.w500Image(cast?.profile_path)}alt="profilePhoto" />
                   </div>
                  <p className='cast__item-name'>{cast?.name}</p>
               </div>
             )}
       

     }
      
     )}
    </div>
  )
}

export default CastList