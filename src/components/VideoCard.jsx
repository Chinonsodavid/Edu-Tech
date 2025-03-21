import { FaThumbsUp } from "react-icons/fa";

const VideoCard = ({ video, videoStats = {}, handleVideoClick = () => {} }) => {
  // Ensure video has valid data
  if (!video || !video.id || !video.title) {
    return <p className="text-red-500">Invalid video data</p>;
  }

  return (
    <div
      className="relative bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-xl backdrop-blur-md bg-opacity-70 border border-gray-200"
    >
      {/* Video */}
      <div className="relative">
        <iframe
          className="w-full h-52 rounded-t-xl"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          allowFullScreen
        ></iframe>

        {/* Partial Click Overlay - Only covers top half */}
        <div
          className="absolute top-0 left-0 w-full h-1/2 bg-transparent cursor-pointer"
          onClick={() => handleVideoClick(video)}
        ></div>

        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-3 py-1 rounded-md shadow-md">
          HD
        </div>
      </div>

      {/* Card Content with Clickable Title */}
      <div className="p-5 pb-16 relative">
        <h3
          className="text-lg font-semibold text-gray-900 leading-tight h-12 overflow-hidden mb-6 cursor-pointer"
          onClick={() => handleVideoClick(video)}
        >
          {video.title.length > 60 ? video.title.substring(0, 57) + "..." : video.title}
        </h3>

        {/* Like Button Positioned Absolutely */}
        <div className="absolute bottom-4 left-5">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md transition hover:bg-blue-600 hover:scale-105"
          >
            <FaThumbsUp className="text-lg" />
            {videoStats?.[video.id]?.likes?.toLocaleString() || "0"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
