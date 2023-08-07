import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YoutubeFrame from "../../components/YoutubeFrame";

function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/video/${id}`)
      .then((response) => {
        setVideo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="w-screen">
      {video && (
        <div className="flex flex-col items-center">
          <YoutubeFrame videoUrl={video.youtube_url} />
          <div className="text-xl">Comments</div>
          <hr className="w-screen border border-black" />
          {video.comments.map((comment) => (
            <div key={comment._id} className="flex flex-col items-center">
              <div className="text-xl">{comment.username}</div>
              <div className="text-xl">{comment.comment}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoDetail;
