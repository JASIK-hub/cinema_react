import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/topOfWeek.css'
import girland from '../images/christmas-string-lights-isolated-glowing-realistic-garlands-dark-background-holiday-shimmering.png'
function TopMovies(){
    const [state,setState]=useState({results:[]})
    useEffect(()=>{
        fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US',{
             method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjQ3NzNmZTU3ZDc3Mzc0N2ZhY2EwZDcxMTRkM2NlMCIsIm5iZiI6MTc0NzE0NjQ0Ni4yNTMsInN1YiI6IjY4MjM1NmNlMjkxN2E4Mjc2YjZlZTk4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTu1oNbkp_Ng4J2_wUFG_vmfEVnr1FlwgZdsBMd7igk'
            }
        }).then(res=>res.json())
        .then(data=>{
            setState(data)
            console.log(data)
        })
    },[])
    return(
        <>
            {state.results.length>0 && <RenderMovies data={state.results}/>}
        </>
    )
}
function RenderMovies({data}){
    const navigate=useNavigate()
    return(
        <div className="top_movies_container" >
            <h2 style={{color:'white'}}><span className="top10">Top 10</span> of the Week</h2>
             <img className="girland" src={girland} alt="" />
            <div className='top_movies'>
               
                {data.slice(0,10).map((movie,i)=>(
                    <div className="top_movie_card" key={movie.id} >
                        
                        <span >{i+1}</span>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} style={{width:'100%',cursor:'pointer'}} onClick={()=>navigate(`/film/${movie.id}`)}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default TopMovies