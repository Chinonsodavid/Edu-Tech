import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; 
import VideoCard from "./VideoCard";// Import the reusable component

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const categories = {
  "All Videos": "advance educational videos",
  Maths: "math education",
  English: "english learning",
  Science: "science experiments",
  Coding: "coding tutorials",
};

export default function CategoryPage() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Videos");
  const [visibleCount, setVisibleCount] = useState(6);
  const [videoStats, setVideoStats] = useState({});

  useEffect(() => {
    fetchVideos(categories["All Videos"]);
  }, []);

  const fetchVideos = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${API_KEY}`
      );
      const data = await response.json();
      const videoList = data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));

      setVideos(videoList);
      setFilteredVideos(videoList);
      fetchVideoStats(videoList);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchVideoStats = async (videoList) => {
    try {
      const ids = videoList.map((video) => video.id).join(",");
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids}&key=${API_KEY}`
      );
      const data = await response.json();
      const stats = {};
      data.items.forEach((item) => {
        stats[item.id] = { likes: item.statistics.likeCount };
      });
      setVideoStats(stats);
    } catch (error) {
      console.error("Error fetching video stats:", error);
    }
  };

  const filterVideos = (category) => {
    setSelectedCategory(category);
    fetchVideos(categories[category]);
  };

  const handleVideoClick = async (video) => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.log("User not logged in. Cannot save history.");
      return;
    }
  
    try {
      const historyRef = collection(db, "users", user.uid, "history");
      await addDoc(historyRef, {
        title: video.title,
        videoId: video.id,
        watchedAt: serverTimestamp(),
      });
      console.log(`✅ Successfully saved: ${video.title}`);
    } catch (error) {
      console.error("❌ Error saving video to history:", error);
    }
  };

  return (
    <div className="py-16 pt-48 max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-medium text-gray-900 text-center mb-16 overflow-hidden">
        Explore Educational Videos
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => filterVideos(category)}
            className={`px-6 py-2 rounded-lg text-lg font-normal transition duration-300 ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredVideos.slice(0, visibleCount).map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            videoStats={videoStats}
            handleVideoClick={handleVideoClick}
          />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredVideos.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount(visibleCount + 6)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md transition hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
