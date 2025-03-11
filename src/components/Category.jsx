import { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // Adjust path based on your setup

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Store securely in .env

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
  
    console.log(`Saving video to history: ${video.title} (ID: ${video.id})`);
  
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
      {/* Page Title */}
      <h1 className="text-4xl font-medium text-gray-900 text-center mb-16">
        Explore Educational Videos
      </h1>

      {/* Category Buttons */}
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
          <div
            key={video.id}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-xl backdrop-blur-md bg-opacity-70 border border-gray-200"
          >
            {/* Video */}
            <div className="relative">
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleVideoClick(video)}
              >
                <iframe
                  className="w-full h-52 rounded-t-xl"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allowFullScreen
                ></iframe>
              </a>
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-3 py-1 rounded-md shadow-md">
                HD
              </div>
            </div>

            {/* Card Content with Fixed Height */}
            <div className="p-5 pb-16 relative">
              <h3 className="text-lg font-semibold text-gray-900 leading-tight h-12 overflow-hidden mb-6">
                {video.title.length > 60
                  ? video.title.substring(0, 57) + "..."
                  : video.title}
              </h3>

              {/* Like Button Positioned Absolutely */}
              <div className="absolute bottom-4 left-5">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md transition hover:bg-blue-600 hover:scale-105"
                >
                  <FaThumbsUp className="text-lg" />
                  {videoStats[video.id]?.likes?.toLocaleString() || "0"}
                </button>
              </div>
            </div>
          </div>
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
