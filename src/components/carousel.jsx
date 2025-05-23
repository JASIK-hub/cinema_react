import { useState, useEffect } from "react";
import '../styles/Home.css';
import 'boxicons/css/boxicons.min.css'
import { useNavigate } from 'react-router-dom';
function Carousel(){
  
const [state, setState] = useState({ results: [] });

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=us", {
      method: 'GET',
       headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjQ3NzNmZTU3ZDc3Mzc0N2ZhY2EwZDcxMTRkM2NlMCIsIm5iZiI6MTc0NzE0NjQ0Ni4yNTMsInN1YiI6IjY4MjM1NmNlMjkxN2E4Mjc2YjZlZTk4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTu1oNbkp_Ng4J2_wUFG_vmfEVnr1FlwgZdsBMd7igk'
  }
    })
    .then(res => res.json())
    .then(data => {
      setState(data);
    });
  }, []);

  return (
    <div>
      {state.results.length> 0 && <AutoCarousel images={state.results} />}
    </div>
  );
}

function AutoCarousel({ images }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);
  const goNext = () => {
    setIndex(prev => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setIndex(prev => (prev - 1 + images.length) % images.length);
  };
  return (
    <div className="carousel">
      <div className="carousel-track" style={{ transform: `translateX(-${index * 1236}px)` }}>
        {images.map((movie, i) => (
          <div className='posterContainer' onClick={()=>navigate(`/film/${movie.id}`)}  key={i} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}}>
            <div className="posterInformation">
              <h2 className='posterTitle'>{movie.original_title}</h2>
              <p className="posterDescription">{movie.overview}</p>
            </div>
            
            <div className="left_blur"></div>
          </div>
        ))}
      </div>
      <div className='carouselButtons'>

          <i className='bxCarousel bx bx-chevron-left' onClick={goPrev}></i>
       
        
          <i className='bxCarousel bx bx-chevron-right' onClick={goNext}></i>
             </div>
    </div>
  )

}
export default Carousel