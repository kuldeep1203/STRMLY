import  React, {useEffect , useState} from "react";
import "../App.css"
import { useNavigate } from "react-router-dom";
type Video = {
  _id: string;
  title: string;
  url: string;
  createdAt:string;
};

const ManageVideos:React.FC=()=>{

    const navigate = useNavigate();
    const [videos ,setVideos] = useState<Video[]>([]);
    const fetchVideo = async ()=>{
        try{
            const res  =await fetch("http://localhost:3000/api/v1/user/fetchUserVideos",{
                method:"GET",
                credentials:"include",
            });
            if(res.ok){
                const data = await res.json();
                setVideos(data.response);
            }else if(res.status===401 || res.status === 403){
                navigate("/");   
            }
            else{
                console.error("Failed to fetch user videos");
            }
        }catch(error){
            console.log(`Errorfetchvideos:${error}`);
            throw new Error(`Error fetch videos : ${error}`)
        }
    };
    useEffect(()=>{
        fetchVideo();
    },[])

    return (
      <div>
        <div className="netflix-header">
          <div className="header-content">
            <div className="netflix-logo">Strmly</div>
            <div>
                
            </div>
          </div>
        </div>
        <div className="video-gallery">
          {videos.map((video) => (
            <div key={video._id} className="video-card">
              <video src={video.url} controls className="video-player" />
              <h4 className="video-title">{video.title}</h4>
              <span className="video-date">
                {new Date(video.createdAt).toLocaleDateString("en-US",{
                    year:"numeric",
                    month:"short",
                    day: "numeric",
                })}

              </span>
            </div>
          ))}
        </div>
      </div>
    );
}
export default ManageVideos;