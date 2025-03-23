import { useState, useEffect, useRef } from "react";
import VideoCard from "./VideoCard";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const categories = {
  "All Videos": "advance educational videos",
  Maths: "math education",
  English: "english learning",
  Science: "science experiments",
  Coding: "coding tutorials",
};

const subcategories = {
  Maths: ["Basic", "Medium", "Advanced"],
  English: ["Basic", "Medium", "Advanced"],
  Science: ["Basic", "Medium", "Advanced"],
  Coding: ["Basic", "Medium", "Advanced"],
};

export default function CategoryPage() {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Videos");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    fetchVideos(categories["All Videos"]);
  }, []);

  const fetchVideos = async (query, nextPage = "", isLoadMore = false) => {
    if (!isLoadMore) setLoading(true);
    else setLoadingMore(true);

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${query}&type=video&key=${API_KEY}&pageToken=${nextPage}`
      );
      const data = await response.json();
      const videoList = data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));

      setVideos((prevVideos) => (isLoadMore ? [...prevVideos, ...videoList] : videoList));
      setNextPageToken(data.nextPageToken || null);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const filterVideos = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory("");
    fetchVideos(categories[category]);
  };

  const filterBySubcategory = (subcategory) => {
    setSelectedSubcategory(subcategory);
    fetchVideos(subcategory);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      fetchVideos(searchTerm);
    }
  };

  // Infinite Scrolling
  useEffect(() => {
    if (!nextPageToken) return;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextPageToken) {
        fetchVideos(selectedCategory !== "All Videos" ? categories[selectedCategory] : searchTerm, nextPageToken, true);
      }
    });

    if (document.getElementById("load-more")) {
      observer.current.observe(document.getElementById("load-more"));
    }

    return () => observer.current && observer.current.disconnect();
  }, [nextPageToken]);

  return (
    <div className="py-16 pt-48 max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-medium text-gray-900 text-center mb-16">Explore Educational Videos</h1>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => filterVideos(category)}
            className={`px-6 py-2 rounded-lg text-lg font-normal transition duration-300 ${
              selectedCategory === category ? "bg-blue-600 text-white shadow-md" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Subcategory Buttons */}
      {subcategories[selectedCategory] && (
        <div className="flex justify-center gap-4 mb-6">
          {subcategories[selectedCategory].map((sub) => (
            <button
              key={sub}
              onClick={() => filterBySubcategory(sub)}
              className={`px-4 py-2 rounded-lg text-lg transition ${
                selectedSubcategory === sub ? "bg-yellow-500 text-white" : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-l-lg"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700">
          Search
        </button>
      </div>

      {/* Loading Animation (Full Section) */}
      {loading ? (
        <div className="flex justify-center my-10 ">
          <div className="flex space-x-2 pt-16">
            <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
            <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-5">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {/* Load More Button */}
          {nextPageToken && (
          <div className="text-center mt-10">
          <button
            onClick={() => fetchVideos(selectedCategory !== "All Videos" ? categories[selectedCategory] : searchTerm, nextPageToken, true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md transition hover:bg-blue-700 flex items-center justify-center mx-auto"
            disabled={loadingMore}
          >
            {loadingMore ? (
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
              </div>
            ) : (
              "Load More"
            )}
          </button>
        </div>
        
          )}
        </>
      )}

      {/* Infinite Scrolling Trigger */}
      <div id="load-more" className="h-10"></div>
    </div>
  );
}
