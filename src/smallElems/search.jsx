import '../styles/search.css'
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function SearchFilm({change}){
    const navigate=useNavigate()
    const [searchfilm,setFilm]=useState({results:[]})

    useEffect(()=>{     
         fetch(`https://api.themoviedb.org/3/search/movie?query=${change}&include_adult=false&language=en-US&page=1`,{
         method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjQ3NzNmZTU3ZDc3Mzc0N2ZhY2EwZDcxMTRkM2NlMCIsIm5iZiI6MTc0NzE0NjQ0Ni4yNTMsInN1YiI6IjY4MjM1NmNlMjkxN2E4Mjc2YjZlZTk4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTu1oNbkp_Ng4J2_wUFG_vmfEVnr1FlwgZdsBMd7igk'
        }
    }).then(res=>res.json())
      .then(data=>{
        setFilm(data.results)
        console.log(data)
      })
    },[change]) 
    return(
        <>
        <div style={{overflow:'hidden'}}>
         {searchfilm.length>0 && (
            <div className='searchedFilms_container'>
                {searchfilm.filter(film=>film.popularity>1).sort((a,b)=>b.popularity-a.popularity).slice(0,10).map(film=>(
                    <div className="searched_film_container" key={film.id} onClick={()=>navigate(`film/${film.id}`)}>
                        <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} style={{width:"100px",height:'150px'}} alt="" />
                        <div className="searchedfilm_info">
                             <p className='searched_film_title'>{film.title}</p>
                             <p style={{color:'white'}}>{film.release_date.slice(0,4)}</p>
                        </div>
                    </div>
                ))}   
            </div>
         )}
         </div>
         </>
       
    )
}
function RenderSearch(){
    const [value,setValue]=useState('')
    const [change,onChange]=useState('')
    useEffect(()=>{
        const timeout=setTimeout(()=>{
            onChange(value)
        },500)
        return()=>clearTimeout(timeout)

    },[value])
   

    return(
        <div className="search_global_container">
            <div className="search_global_header">
                <img src="https://solea-parent.dfs.ivi.ru/picture/f30745,ffffff/reposition_iviLogoPlateRounded.svg" alt="" />
                <div className="" style={{display:'flex',gap:'10px',alignItems:'center'}}>
                    <SearchIcon sx={{color:'white'}}/>
                    <input type="text" className="film_title_input" placeholder='Search Film,Tv Series' onChange={(e)=>setValue(e.target.value)}/>
                </div>
            </div>
        {change.length>0 && <SearchFilm change={change}/> }
        </div>
         
    )
}
export default RenderSearch