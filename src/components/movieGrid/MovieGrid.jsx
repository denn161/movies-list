import React,{useEffect,useState,useCallback} from 'react'
import PropTypes from 'prop-types'
import {MovieItem,Input} from '../'
import Loader from './Loader'

import tmbdApi,{category as cate,movieType,tvType} from '../../api/moviesTmBdApi'
import { useNavigate, useParams } from 'react-router-dom'
import './moviegrid.scss'
import { OutlineButton } from '../button/Button'


  
function MovieGrid({category}) {

  const {keyword}=useParams()

  

 const [items,setItems]=useState([])

 const [loading,setLoading]=useState(false)

 const [page,setPage]=useState(1)

 const [totalPage,setTotalPage]=useState(0)



 const getMovieType = useCallback(async ()=>{

    let response;
  try {

    if(!keyword){
        const params={language:'ru'}
      
       switch (category) {

           case cate.movie:
            setLoading(true)

           response =await tmbdApi.getMoviesList(movieType.upcoming,{params})               
               break;
       
           default:
            setLoading(true)
               response =await tmbdApi.gettvList(tvType.popular,{params})
       }
    }else{
      setLoading(true)
       const params={query:keyword,language:'ru'}

       response =await tmbdApi.searchVideos(category,{params})
   }    
     
    setItems(response.data.results)
    setTotalPage(response?.data?.total_pages)
    setLoading(false)

  } catch (error) {
    setLoading(false)
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
              setLoading(true)
                response =await tmbdApi.getMoviesList(movieType.upcoming,{params})               
                    break;
            
                default:
                     setLoading(true)
                    response =await tmbdApi.gettvList(tvType.popular,{params})
          }
      }else{
        setLoading(true)
        const params={page:page+1,query:keyword,language:'ru'}        
        response =await tmbdApi.searchVideos(category,{params})
      }
      setItems([...items,...response.data.results])
      setPage(page+1)
      setLoading(false)
    

        
    } catch (error) {
      setLoading(false)
        console.log(error.message)
        
    }
 }

   if (loading) return <Loader/>    

  return (
   <>
    <div className="section mb-3"><MovieSearch keyword={keyword} category={category}/></div>
    <div className='movie__grid mb-3'>
   {items.length? items?.map((item)=>
    <MovieItem key={item?.id} item={item} category={category} />   
   ) :<div>The movie was not found.Try again</div>}  
    </div>
    {page<totalPage ? (<div className='movie__grid-btn' >
      <OutlineButton className={'small'}
                     onClick={loadMore}>
      Load more
      </OutlineButton>
      </div>):null}
  
   </>
  )
}

const MovieSearch = (props)=>{  

const navigate = useNavigate()

const [keyword,setKeyWord]=useState(props.keyword?props.keyword:'')

const gotoSearch =useCallback(()=>{
   if(keyword.trim()){
    navigate(`/${cate[props.category]}/search/${keyword}`)
   
   }
 

},[keyword,props.category,navigate])

 useEffect(()=>{
  const enterEvent =(e)=>{
    e.preventDefault()
    if(e.keyCode===13){
      gotoSearch()
     
    }
   
  }

  document.addEventListener('keyup',enterEvent)

  return ()=>{
    document.removeEventListener('keyup',enterEvent)
  }

 },[gotoSearch,keyword])
  
  return(
    <>
    <Input
     type={'text'}
      placeholder='Enter name movies'
       value={keyword}
        onChange={(e)=>setKeyWord(e.target.value)}
         onClick={gotoSearch} />
    </>
  )
}



MovieGrid.propTypes = {
category:PropTypes.string

}

export default MovieGrid
