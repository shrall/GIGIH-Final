import { AiOutlineEnter } from "react-icons/ai";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import YoutubeFrame from "../../components/YoutubeFrame";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import CommentCard from "../../components/CommentCard";

function VideoDetail() {
  const { id } = useParams();
  const {
    data: video,
    isLoading,
    error,
  } = useFetch(`${import.meta.env.VITE_API_URL}/video/${id}`);

  const [comments, setComments] = useState([]);
  const commentContainerRef = useRef(null);

  const fetchComments = async (videoId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/video/${videoId}/comment`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments(id);
  }, []);

  const submitComment = async (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const comment = e.target.value;
      e.target.value = "";
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/comment`,
          {
            username: "Guest",
            comment: comment,
            video_id: id,
          }
        );
        setComments((prevComments) => [...prevComments, response.data]);
      } catch (error) {
        console.error("Error creating comment:", error);
      }
    }
  };

  useEffect(() => {
    if (commentContainerRef.current) {
      commentContainerRef.current.scrollTop =
        commentContainerRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div className="mx-auto text-white">
      {!isLoading && (
        <div className="flex flex-col-reverse lg:flex-row justify-end gap-2 lg:gap-0">
          <div className="flex flex-col w-full max-w-md px-8 items-start justify-center gap-2 bg-transparent lg:bg-black relative">
            <div className="text-3xl">{video.title}</div>
            <div className="text-xl">{video.views} Views</div>
            <hr className="border border-white w-full" />
            <div className="flex flex-col w-full h-64 gap-2">
              <div className="text-2xl">{comments.length} Comments</div>
              <div
                className="overflow-y-auto no-scrollbar flex-grow"
                ref={commentContainerRef}
              >
                {comments.map((comment, i) => (
                  <CommentCard key={i} comment={comment} />
                ))}
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  className="border-2 border-white bg-transparent rounded-lg focus:border-indigo-800 pl-2 pr-24 w-full"
                  placeholder="Add a comment..."
                  onKeyDown={submitComment}
                />
                <div className="absolute flex gap-2 right-4 items-center justify-center text-gray-500 top-1/2 transform -translate-y-1/2">
                  <AiOutlineEnter />
                  <span>Enter</span>
                </div>
              </div>
            </div>
            <div className="flex overflow-x-auto w-full no-scrollbar">
              {video.products.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
            <div className="hidden lg:block w-96 h-full bg-gradient-to-r from-black to-transparent absolute top-0 -right-96 pointer-events-none"></div>
          </div>
          <YoutubeFrame videoUrl={video.youtube_url} />
        </div>
      )}
    </div>
  );
}

export default VideoDetail;
