import React, { useEffect, useState } from "react";

type Video = {
    _id: string;
    title: string;
    url: string;
}


export const VideoFeed:React.FC=()=>{

    const [videos,setVideos] = useState<Video[]>([]);
    const [loading,setLoading] = useState(true);
    const[currentIndex,setCurrentIndex] =  useState(0);
    const [refreshing , setRefreshing]  = useState(false);

    const fetchVideo = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/user/fetchData", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setVideos(data.videos);
        } else {
          console.error("Failed to fetch videos");
          throw new Error("Failed to fetch video");
        }
      } catch (err) {
        console.error(`Error fetching videos: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    useEffect(()=>{
        fetchVideo() 
       },[])

       const handleRefresh=()=>{
        setRefreshing(true);
        fetchVideo()
       }

       if (loading) return <div>Loading video...</div>;
       if (!videos || videos.length === 0) {
         return (
           <div
             style={{ color: "white", textAlign: "center", marginTop: "2rem" }}
           >
           </div>
         );
       }
    
    
       const currentVideo = videos[currentIndex];

       const nextVideo = ()=>{setCurrentIndex((prev)=>(prev+1)%videos.length)};
       const prevVideo = ()=>{setCurrentIndex((prev)=>(prev-1+videos.length)%videos.length)}

       return (
         <div
           style={{
             maxWidth: 640,
             margin: "auto",
             padding: 16,
             textAlign: "center",
           }}
         >
           <h2>{currentVideo.title}</h2>
           <video
             src={currentVideo.url}
             controls
             style={{
               width: "100%",
               maxHeight: "70vh",
               borderRadius: 8,
               backgroundColor: "black",
             }}
           ></video>
           <div style={{ marginTop: 16 }}>
             <button className="profile-btn" onClick={prevVideo} style={{ marginRight: 8 }}>
               ⬅ Previous
             </button>
             <button className="profile-btn"onClick={nextVideo}>Next ➡</button>
           </div>
           <p style={{ marginTop: 8, color: "#888" }}>
             {currentIndex + 1} of {videos.length}
           </p>
           <br />
           <button className= "glossy-button" onClick={handleRefresh}>Refresh Feed</button>
         </div>
       );

}  
