import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link key={video.id} to={`/video/${video.id}`}>
      <div className="bg-zinc-800 rounded-lg shadow-lg p-4 relative hover:scale-110 transition-all group">
        <div className="flex flex-col gap-2">
          <div className="relative">
            <img
              className="h-full w-full object-cover rounded-lg"
              src={video.thumbnail_url}
              alt={video.title}
            />
            <div className="absolute w-full h-full top-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2 text-white text-lg">
              <FaPlayCircle />
              <p>Watch Video</p>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-white text-xl font-bold truncate">
              {video.title}
            </h2>
          </div>
          <div className="flex">
            <p className="text-gray-400 text-sm">{video.views} views</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
