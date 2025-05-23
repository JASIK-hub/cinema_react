import { useEffect,useState} from "react";
import '../styles/Home.css'

function GenresList(){
    const [state,setState]=useState({genres:[]})
    useEffect(()=>{
        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en',{
             method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjQ3NzNmZTU3ZDc3Mzc0N2ZhY2EwZDcxMTRkM2NlMCIsIm5iZiI6MTc0NzE0NjQ0Ni4yNTMsInN1YiI6IjY4MjM1NmNlMjkxN2E4Mjc2YjZlZTk4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTu1oNbkp_Ng4J2_wUFG_vmfEVnr1FlwgZdsBMd7igk'
            }
        }).then(res=>res.json())
        .then(data=>{
            setState(data)
        })
        
    },[])
    return(
            <>
            {state.genres.length>0 && <RenderGenres data={state.genres}/>}
            </>
        )
    }
    function RenderGenres({data}){
        const [initialState,newState]=useState(0)
        function slideRight(){
            newState(prev=>{
                const next=prev+1
                if(next *1236>2500){
                    return prev
                }
                return next
            })
            
        }
        function slideLeft(){
            newState(prev=>prev-1)
        }
        return(
            <div style={{position:'relative'}}>
                <div style={{width:'1216px',margin:'50px auto',overflow:'hidden'}}>
                    <div style={{transform:`translateX(-${initialState*1236}px)`,display:'flex',gap:'20px',transition:'transform 0.5s ease'}}>
                        {data.map((genre)=>{
                            return(
                            <button className='genreListBtn' key={genre.id} >
                                {genre.name}
                            </button>
                            )
                            
                        })}
                    </div>
                </div>
                <div className="genreSlideButtons">
                    <i className='bxCarousel bx bx-chevron-left' onClick={slideLeft} style={{display: initialState >=1? 'block' :'none',position:'absolute',top:'-12px'}}></i>
                    <i className='bxCarousel bx bx-chevron-right' onClick={slideRight}style={{position:'absolute',top:'-12px'}}></i>
                </div>
            </div>
        )


    }

export default GenresList