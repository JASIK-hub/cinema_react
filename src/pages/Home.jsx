import Header from "../components/Header";
import GenresList from '../components/genresList'
import Carousel from "../components/carousel";
import GenreMovie from "../components/genreMovie";
import TopMovies from "../components/topOfTheWeek"
import glassBg from '../images/abstract-liquid-glass-transparent-ribbon.png';
import vecteezy from '../images/vecteezy_3d-vibrant-abstract-fluid-element-with-transparent-background_52782790.png';
import love from  '../images/vecteezy_fly-out-love-shape-from-gift-box-3d-item_47311473.png';
import wave from '../images/vecteezy_abstract-moving-line-wave-element_44761665.png'
import GetVideo from "../components/getVideo";
import Footer from "../components/footer";

function Home() {
  return(
    <>
    <Header/>
    <Carousel/>
    <GenresList/>
    <div className="genreContainer" >
      <img src={vecteezy} alt="" style={{position:'absolute',width:'700px',top:'1000px',zIndex:'-1',left:'-300px',transform:'rotate(90deg)',opacity:'0.5'}} />
       <img src={glassBg} alt=""  style={{position:'absolute',width:'700px',top:'600px',zIndex:'-1',right:'-250px'}}/> 
       <img src={wave} alt="" style={{position:'absolute',width:'1700px',top:'3000px',zIndex:'-1',left:'0px',opacity:'0.4',transform:'rotate(40deg)'}}/>
       <img src={love} alt="" style={{position:'absolute',width:'700px',top:'1600px',zIndex:'-1',right:'0px',opacity:'0.4',transform:'rotate(40deg)'}}/>
      <GenreMovie genreId={18} genreText={'Dramas'}/>
      <GenreMovie genreId={35} genreText={'Comedy Films that you will like'}/>
      <GetVideo />
      <GenreMovie genreId={10751} genreText={'Films to watch with Family'}/>
      <GenreMovie genreId={36}  genreText={'Epic History Series'}/>
      <GenreMovie genreId={27} genreText={'Scary Night Picks'}/>
      <GenreMovie genreId={53} genreText={'Exciting Movies'}/>
      <TopMovies/>
      <GenreMovie genreId={10402} genreText={'Musical'}/>
      <GenreMovie genreId={99} genreText={'Documentary'}/>
      <GenreMovie genreId={10770} genreText={'TV Movies'}/>
      <Footer/>
        
    </div>
    
  </>
  )
  
}

export default Home;