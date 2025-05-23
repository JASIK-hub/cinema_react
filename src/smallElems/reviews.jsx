import { useState,useEffect } from "react";

function Reviews({id}){
    const [state,setState]=useState({results:[]})
    useEffect(()=>{
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjQ3NzNmZTU3ZDc3Mzc0N2ZhY2EwZDcxMTRkM2NlMCIsIm5iZiI6MTc0NzE0NjQ0Ni4yNTMsInN1YiI6IjY4MjM1NmNlMjkxN2E4Mjc2YjZlZTk4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTu1oNbkp_Ng4J2_wUFG_vmfEVnr1FlwgZdsBMd7igk'
        }
        };
    fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`, options)
    .then(res=>res.json())
    .then(data=>{
        setState(data)
    })
    },[])
    return(
        <>
        {state.results.length>0 && <RenderReviews reviews={state.results}/>}
        </>
         
    )
   
}

function RenderReviews({reviews}){
    const [show,setShow]=useState(false)
    function maxLength(txt){
        let maxLength=200
        let isLong=txt.split('').length>maxLength
        if(isLong){
            return txt.slice(0,maxLength) + '...'
        }
        return txt
    }
    return(<>
        <div className="review_title" style={{color:"white",fontSize:'25px',fontWeight:700,marginTop:100,display:'flex',gap:10}}>
            Reviews
            <div className="" style={{fontSize:15,background:'#2c2c2c',borderRadius:'50%',width:35,heigth:40,display:'flex',justifyContent:'center',alignItems:"center"}}>
                {reviews.length}
            </div>
        </div>
        <div className="review_container" style={{width:1216}}>  
            <div className="" style={{display:'grid',marginTop:20,gap:10,gridTemplateColumns:'repeat(3,398px)'}}>
            {reviews.map(review=>(
                <div className="single_review" key={review.id} style={{padding:'5px 40px',backgroundColor:'#1E1E1E',borderRadius:"10px",position:'relative'}}>
                     <h4 style={{fontSize:15,color:"var(--gray)"}} className="review_author">{review.author}</h4>
                     <p style={{color:'var(--gray)',fontSize:15,width:'100%'}}>{maxLength(review.content)}</p>
                     {show &&<button>no</button>}
                     <p style={{position:'absolute',top:14,right:40,color:"var(--gray)",fontSize:13}}>{review.created_at.slice(0,10).split('-').join('.')}</p>
                </div>
            ))}
           </div>
        </div>
        </>
    )
    
}
export default Reviews