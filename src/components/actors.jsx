import { useEffect,useState } from "react";
import '../styles/App.css'
function ActorsCrew({filmId}){
    const [people,setPeople]=useState({cast:[]})
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjQ3NzNmZTU3ZDc3Mzc0N2ZhY2EwZDcxMTRkM2NlMCIsIm5iZiI6MTc0NzE0NjQ0Ni4yNTMsInN1YiI6IjY4MjM1NmNlMjkxN2E4Mjc2YjZlZTk4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTu1oNbkp_Ng4J2_wUFG_vmfEVnr1FlwgZdsBMd7igk'
            }
        };
        fetch(`https://api.themoviedb.org/3/movie/${filmId}/credits?language=en-US`,options)
        .then(res=>res.json())
        .then(peopleData=>{
            setPeople(peopleData)
            
        })
    
},[filmId])
return(
        <>
            {people.cast.length>0 && <RenderActors crew={people.cast}/>}
        </>
    )
}

function RenderActors({crew}){
    return(
        <div className="crew_container" style={{marginTop:'100px',position:'relative' }}>
            <h4 className="crew_title" style={{color:'white',fontSize:'25px'}}>Actors</h4>
            <p className="showMore_actorsBtn" style={{position:'absolute',top:0,right:0,color:'var(--gray)'}}>Show More</p>
            <div className="crew_container_actors" style={{display:'flex',gap:'15px'}}>
                {crew.slice(0,9).map(person =>(
                    <div className="crew_actor_info" key={person.cast_id}>
                        <img src={`https://image.tmdb.org/t/p/original/${person.profile_path}`} style={{borderRadius:'50%',width:'121px',height:'121px',objectFit:'cover'}}/>
                        <p className="person_Name" style={{color:'white'}}>{person.name}</p>
                    </div>

                ))}
            </div>
        </div>
    )

}
export default ActorsCrew