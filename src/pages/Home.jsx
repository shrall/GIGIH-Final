import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import usePaginationWithSearch from "../hooks/usePaginationWithSearch";
import useDebounce from "../hooks/useDebounce";
import { FaVideoSlash } from "react-icons/fa";
import LoadingVideoCard from "../components/LoadingVideoCard";
import VideoCard from "../components/VideoCard";

function Home() {
  //NOTE - get the search param from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  //NOTE - reset page to 1 when search term changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  //NOTE - fetch videos from API
  const {
    data: videos,
    totalPage,
    isLoading,
    error,
  } = usePaginationWithSearch(
    `${
      import.meta.env.VITE_API_URL
    }/video?page=${page}&search=${debouncedSearchTerm}`,
    debouncedSearchTerm
  );

  //SECTION - infinite scroll
  const handleScroll = () => {
    //NOTE - if user is not at the bottom of the page or if the page is loading, return
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
  //!SECTION

  return (
    <div>
      {videos && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 md:p-4 lg:pt-8">
          {videos.map((video) => {
            return <VideoCard key={video.id} video={video} />;
          })}
        </div>
      )}
      {isLoading && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 md:p-4 lg:pt-8">
          {[...Array(4)].map((e, i) => (
            <LoadingVideoCard key={i} />
          ))}
        </div>
      )}
      {videos.length === 0 && !isLoading && (
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center h-screen-70">
          <FaVideoSlash className="text-6xl text-white" />
          <p className="text-2xl text-white">No videos found</p>
        </div>
      )}
    </div>
  );
}

export default Home;
