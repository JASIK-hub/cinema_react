import Header from "../components/Header";
import { useParams } from 'react-router-dom';
import { useEffect,useState } from "react";
function GetGenreFilms(){
    const {id}=useParams()
    useEffect(()=>{
        
         fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,{
             method: 'GET',
             headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjQ3NzNmZTU3ZDc3Mzc0N2ZhY2EwZDcxMTRkM2NlMCIsIm5iZiI6MTc0NzE0NjQ0Ni4yNTMsInN1YiI6IjY4MjM1NmNlMjkxN2E4Mjc2YjZlZTk4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTu1oNbkp_Ng4J2_wUFG_vmfEVnr1FlwgZdsBMd7igk'
            }
         }).then(res=>res.json())
        .then(data=>console.log(data))
    },[])
}

function RenderGenre(){
    return(
        <>
            <Header/>
            <hr />
            <GetGenreFilms/>
        </>
    )
}
export default RenderGenre