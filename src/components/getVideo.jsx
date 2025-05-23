import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GetVideo() {
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/1443487/videos?language=en-US', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjQ3NzNmZTU3ZDc3Mzc0N2ZhY2EwZDcxMTRkM2NlMCIsIm5iZiI6MTc0NzE0NjQ0Ni4yNTMsInN1YiI6IjY4MjM1NmNlMjkxN2E4Mjc2YjZlZTk4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTu1oNbkp_Ng4J2_wUFG_vmfEVnr1FlwgZdsBMd7igk'
      }
    })
      .then(res => res.json())
      .then(data => {
          setVideoKey(data.results[0].key);
        
      });
  }, []);

  return (
    <>
      {videoKey && <Video videoKey={videoKey} />}
    </>
  );
}

function Video({ videoKey }) {
  const navigate=useNavigate()
  const handleMouseEnter = () => {
    const iframe = document.getElementById("yt-iframe");
    if (iframe) {
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  };

  const handleMouseLeave = () => {
    const iframe = document.getElementById("yt-iframe");
    if (iframe) {
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  };

  return (
    <>
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={()=>navigate(`/film/1443487`)}
      
      style={{
        width: '1216px',
        height: '684px',
        margin: '50px auto',
        borderRadius: '10px',
        boxShadow:'0px 0px 20px 3px #d6cc42',
        position:'relative'
      }}
    >
      <iframe
        id="yt-iframe"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoKey}?enablejsapi=1&autoplay=1&controls=0&modestbranding=0&rel=0&mute=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="YouTube video player"
      />
     <div className="layer"
     onClick={() => navigate(`/film/1443487`)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        zIndex:10
      }}></div>
    </div>
    
    </>
  );
}

export default GetVideo;
