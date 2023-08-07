import LoadingVideoCard from "../components/LoadingVideoCard";
import VideoCard from "../components/VideoCard";
import usePagination from "../hooks/usePagination";
import { useState, useEffect, useRef } from "react";

function Home() {
  const [page, setPage] = useState(1);
  const {
    data: videos,
    totalPage,
    isLoading,
    error,
  } = usePagination(`${import.meta.env.VITE_API_URL}/video?page=${page}`);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    if (page < totalPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div>
      {videos && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 md:p-4 lg:pt-8">
          {videos.map((video) => {
            return <VideoCard key={video.id} video={video} />;
          })}
        </div>
      )}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 md:p-4 lg:pt-8">
          {[...Array(4)].map((e, i) => (
            <LoadingVideoCard key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
