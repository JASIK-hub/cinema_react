import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Header from '../components/Header';
import '../styles/filmPage.css'
import StarRating from '../smallElems/rating';
import RecommendMovie from '../components/recommendMovie';
import ActorsCrew from '../components/actors';
import Reviews from '../smallElems/reviews'
import Footer from '../components/footer';

function FilmPage(){
    const { id } = useParams()
    const [details,setDetails]=useState(null)
    const [video,setVideo]=useState({results:[]})
    const [people,setPeople]=useState({cast:[]})
    const [images,setImages]=useState({backdrops:[]})
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjQ3NzNmZTU3ZDc3Mzc0N2ZhY2EwZDcxMTRkM2NlMCIsIm5iZiI6MTc0NzE0NjQ0Ni4yNTMsInN1YiI6IjY4MjM1NmNlMjkxN2E4Mjc2YjZlZTk4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTu1oNbkp_Ng4J2_wUFG_vmfEVnr1FlwgZdsBMd7igk'
            }
        };
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,options)
        .then(res=>res.json())
        .then(detailsData=>{
            setDetails(detailsData)
        })

    //FETCH VIDEO FILE
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,options)
    .then(res=>res.json())
    .then(videoData=>{
        setVideo(videoData)
    })
    //FETCH ACTORS,DIRECTORS
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,options)
    .then(res=>res.json())
    .then(peopleData=>{
        setPeople(peopleData)
    })
    //Fetch images
    fetch(`https://api.themoviedb.org/3/movie/${id}/images`,options)
    .then(res=>res.json())
    .then(imageData=>{
        setImages(imageData)
    })
  
},[id])
    return (
        <>
        {details && video.results.length>0 &&people.cast.length>0 &&
        <RenderPage 
            filmDetails={details} 
            filmVideo={video.results[0]}
            cast={people.cast}
            images={images.backdrops}
        />}
        </>
    )
}

function RenderPage({filmDetails,filmVideo,cast,images}){
    function voteImdb(){
        const rating=filmDetails.vote_average.toFixed(2)
        switch(true){
            case rating >=7:
                return {backgroundColor:'var(--green)'};
            case rating >=5:
                return {backgroundColor:'orange'};
            default:
                return {backgroundColor:'red'}

        }
    }
    return(
        <>
        <Header/>
        <div style={{width:'1216px',position: 'relative',margin:'30px auto',display:'flex',alignItems:'center'}}>
            <div className='filmDetails'>
                <div className="upperSideDescription">
                    <h1>{filmDetails.title}</h1>
                    <div className='shortInfo'>
                        <p className='IMDB' style={voteImdb()}>{filmDetails.vote_average.toFixed(1)}</p>
                        <p className='releaseDate'>{filmDetails.release_date.slice(0,4)}</p>
                        <p className='Genre'>{filmDetails.genres[0].name}</p>
                        <p className='runTime'>{`${(filmDetails.runtime/60).toFixed(0)}h ${(filmDetails.runtime&60).toFixed(0)}min`}</p>
                        <p className='ageRating'>{filmDetails.adult =='true'? '18+' : '16+'}</p>
                    </div>
                </div>
                <div className='lowerSideDescription'>
                    <h4 className='shortDescription'>{filmDetails.overview}</h4>
                    <div className='Actors'>
                            <p style={{color:'var(--gray)'}}>Actors: </p>
                            {cast.filter(actor => actor.order < 3).map(actor => (
                            <p key={actor.id}>{actor.name}</p>
                        ))}
                    </div>
                    <div className='imagesContainer'>
                        {images.slice(0,4).map(image=>(<img key={image.file_path}src={`https://image.tmdb.org/t/p/original/${image.file_path}`}/>))}
                    </div>
                </div>
               
            </div>
                 
           
            <div className='filmDisplay' style={{position:'relative',width:'1216px',zIndex:'-4',top:'-50px'}} >
                <iframe
                    width="1216"
                    height="684"
                    src={`https://www.youtube.com/embed/${filmVideo.key}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&mute=1&loop=1&playlist=${filmVideo.key}&cc_load_policy=0`}
                    title="Video player"
                     frameBorder="0"
                    allow="autoplay; encrypted-media;"
                    allowFullScreen
                
                    ></iframe>
            </div> 
        </div>
        <div className='film_container_main' >
            <h3 className='Description_title_text'>About</h3>
            <hr />
                <div className='film_container_inner'>
                    <div className='film_container_main_left'>
                        <p className='Description_body_text'>{filmDetails.overview}</p>
                    </div>
                    <div className="film_container_main_right">
                        <StarRating/> 
                    </div>
                </div> 
        </div>
        <div className="film_container_recomendation" style={{width:'1216px',margin:'0 auto'}}>
            <RecommendMovie genreId={filmDetails.id}/>
            <ActorsCrew filmId={filmDetails.id}/>
            <Reviews id={filmDetails.id}/>
        </div>
        <Footer/>
        </>
    )
}
export default FilmPage