import axios from "axios";
import axiosClient from "./axiosClient";



export const category = {
    movie:'movie', // фильмы
    tv:'tv' // сериалы и тв передачи
}
export const movieType = {
    upcoming:'upcoming', //текущие
    popular:'popular',  // популярные
    top_rated:'top_rated' // с высоким рейтингом

}


export const tvType = {
    popular:'popular',  // популярные
    top_rated:'top_rated', // с высоким рейтингом,
    ontheAir:'on_the_air' //в прямом эфире

}

const tmbdApi = {

    getMoviesList(type,params){
        const url = `movie/${movieType[type]}`

        return axiosClient.get(url,params)

    },
    gettvList(type,params){
        const url = `tv/${tvType[type]}`

        return axiosClient.get(url,params)

    },
    getVideos(cate,id){
        const url = `${category[cate]}/${id}/videos`

        return axiosClient.get(url,{params:{language:'ru'}})

    },

    searchVideos(cate,params){

        const url =`search/${category[cate]}`

        return axiosClient.get(url,params)

    },

    detailsMovies(cate,id,params){

        const url = `${category[cate]}/${id}`

        return axiosClient.get(url,params)
    },

    creditsMovies(cate,id){

     const url = `${category[cate]}/${id}/credits`

     return axiosClient.get(url,{params:{}})
    },
    similarMovies(cate,id){

        const url = `${category[cate]}/${id}/similar`

        return axiosClient.get(url,{params:{}})
    }
}

export default tmbdApi;


