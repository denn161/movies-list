import {Routers} from './containers'
import {BrowserRouter} from 'react-router-dom'
import { Footer, Header } from './components';
import  './assets/boxicons-2.0.7/css/boxicons.min.css'
import 'swiper/css'

function App() {
  
  return (
    <BrowserRouter>
      <Header/>
       <Routers/>
       <Footer/>
    </BrowserRouter>
  );
}

export default App;
