
const apiConfig={
    baseUrl:'https://api.themoviedb.org/3/',
    apiKey:'8dfaf8a7c0201f6c0bea8f4178b53427',
    languageRu:'ru',
    languageUs:'en',
    originalImage:(imagePath)=>`https://image.tmdb.org/t/p/original/${imagePath}`,
    w500Image:(imagePath)=>`https://image.tmdb.org/t/p/w500/${imagePath}`
}

export default apiConfig;