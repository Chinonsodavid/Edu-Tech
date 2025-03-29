import { useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { FaThumbsUp } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const VideoCard = ({ video, videoStats = {}, handleVideoClick = () => {} }) => {
  const [history, setHistory] = useState([]);

  if (!video || !video.id || !video.title) {
    return <p className="text-red-500">Invalid video data</p>;
  }

  const onVideoClick = async (clickedVideo) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        toast.error("Please log in to save watch history.");
        return;
      }

      const historyRef = collection(db, "users", user.uid, "history");

      await addDoc(historyRef, {
        videoId: clickedVideo.id,
        title: clickedVideo.title,
        thumbnail: clickedVideo.thumbnail || "",
        timestamp: serverTimestamp(),
      });

      console.log("✅ Video saved to history:", clickedVideo.title);
      // toast.success("Video saved to history!");

    } catch (error) {
      console.error("❌ Error saving video:", error);
      toast.error("Failed to save video.");
    }
  };

  return (
    <div
      className="relative bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-xl backdrop-blur-md bg-opacity-70 border border-gray-200"
    >
      <div className="relative">
        <iframe
          className="w-full h-52 rounded-t-xl cursor-pointer"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          allowFullScreen
          onClick={() => onVideoClick(video)}
        ></iframe>

        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-3 py-1 rounded-md shadow-md">
          HD
        </div>
      </div>

      <div className="p-5 pb-16 relative">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight h-12 overflow-hidden mb-6">
          {video.title.length > 60 ? video.title.substring(0, 57) + "..." : video.title}
        </h3>

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
