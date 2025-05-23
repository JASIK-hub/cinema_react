import '../styles/search.css'
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect} from 'react';

function SearchFilm({change}){
    console.log(change)
    useEffect(()=>{     
         fetch(`https://api.themoviedb.org/3/search/movie?query=${change}%20w&include_adult=false&language=en-US&page=1`,{
         method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjQ3NzNmZTU3ZDc3Mzc0N2ZhY2EwZDcxMTRkM2NlMCIsIm5iZiI6MTc0NzE0NjQ0Ni4yNTMsInN1YiI6IjY4MjM1NmNlMjkxN2E4Mjc2YjZlZTk4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTu1oNbkp_Ng4J2_wUFG_vmfEVnr1FlwgZdsBMd7igk'
        }
    }).then(res=>res.json())
      .then(data=>{
        console.log(data)
      })
    },[change])
   
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
            <img src="https://solea-parent.dfs.ivi.ru/picture/f30745,ffffff/reposition_iviLogoPlateRounded.svg" alt="" />
            <div className="" style={{display:'flex',gap:'10px',alignItems:'center'}}>
                <SearchIcon sx={{color:'white'}}/>
                <input type="text" className="film_title_input" placeholder='Search Film,Tv Series' onChange={(e)=>setValue(e.target.value)}/>
            </div>
        {change.length>0 && <SearchFilm change={change}/> }
        </div>
         
    )
}
export default RenderSearch