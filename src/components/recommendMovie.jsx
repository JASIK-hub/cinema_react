import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

function RecommendMovie({genreId}){
    const [initalSt,newSt]=useState({results:[]})
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${genreId}/recommendations?language=en-US&page=1`,{
        method:'GET',
        headers:{
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjQ3NzNmZTU3ZDc3Mzc0N2ZhY2EwZDcxMTRkM2NlMCIsIm5iZiI6MTc0NzE0NjQ0Ni4yNTMsInN1YiI6IjY4MjM1NmNlMjkxN2E4Mjc2YjZlZTk4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTu1oNbkp_Ng4J2_wUFG_vmfEVnr1FlwgZdsBMd7igk'
        }
        }).then(res=>res.json())
        .then(data=>{
            newSt(data)
        })
        },[genreId])
    return(
        <>
            {initalSt.results.length > 0 && <DisplayGenre genreData={initalSt.results}/>}
        </>
    ) 
}
function DisplayGenre({genreData}){
    const [state,newState]=useState(0)
    const [like,isLiked]=useState(false)
    const navigate = useNavigate();

    
        function NextPoster(){
            newState(prev => {
            const next = prev + 1;
            if (next * 1236 > 3000) {
            return prev;
            }
            return next%genreData.length;
        })  
        }
        function previousPoster(){
            newState(prev=>prev-1%genreData.length)
        } 
        function Like(){
            isLiked(!like)
        }
    return(
    
       
        <div className='genre'>
            
            <div className='genreContainerScroll'>
                <div className='genreTitle'>
                    <div style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
                        <h4 className='genreName'>Recommended Films</h4>
                        <i className='bx-title bx bx-chevron-right'></i>
                    </div>
                    
                </div>
                
                <div className='imagesGenreRow' style={{transform:`translateX(-${state*1236}px)`}}>
                    {genreData.map((film,i)=>(
                        <div key={i} className='posterContainer'>
                            <img className='poster' 
                            id={film.id} 
                            src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} 
                            style={{width:'153.71px',height:'234.84px',borderRadius:'10px'}}
                            alt="" 
                            onClick={()=>navigate(`/film/${film.id}`)}/>
                            <h4 className='filmTitle'>{film.title}</h4>
                            <p style={{color:'var(--gray)',margin:'0px',fontSize:'12px'}}>Free</p>
                        </div>
                    ))}
                </div>
            </div>
            <span>
                <i className='bx-genre bx bx-chevron-left' style={{display: state>=1 ? 'block':'none'}}onClick={previousPoster}></i>
            </span>
            <span>  
                <i className='bx-genre bx bx-chevron-right' onClick={NextPoster}></i>
            </span>
        </div>
    )
}
export default RecommendMovie  