import { useState, useEffect } from "react";
import courses from "./coursesData"; // Import courses data
import VideoCard from "./VideoCard";
import { FaBars } from "react-icons/fa"; // Import menu icon

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function CategoryPage() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("Educational videos");
  const [visibleCount, setVisibleCount] = useState(6);
  const [videoStats, setVideoStats] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    fetchVideos(selectedSubject);
  }, [selectedSubject]);

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

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const educationalKeywords = [
      "math",
      "science",
      "history",
      "education",
      "learning",
      "tutorial",
      "lesson",
      "knowledge",
    ];
    const isEducational = educationalKeywords.some((keyword) =>
      term.includes(keyword)
    );

    if (term === "" || isEducational) {
      const filtered = videos.filter((video) =>
        video.title.toLowerCase().includes(term)
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos([]); // Show "No videos available" for non-educational searches
    }
  };

  return (
    <div className="flex">
      {/* Mobile Menu Button */}

      {/* Sidebar (Fixed for desktop, absolute for mobile) */}
      <div
        className={`fixed lg:relative w-60 h-screen bg-white border-r mt-28 pt-5 overflow-y-auto z-50 transition-transform duration-300
        ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Close Button on Mobile */}

        <div className="h-full flex flex-col ">
          <div className="flex flex-row justify-between border-b ">
            <div className="p-5 text-3xl font-thin">Courses</div>
            <div className="lg:hidden flex justify-end p-3">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500 text-3xl"
              >
                &times;
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-5 mt-6">
            <ul className="flex flex-col gap-6">
              {courses.map((course) => (
                <li key={course.name} className="menu-item">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === course.name ? null : course.name
                      )
                    }
                    className="menu-link w-full flex justify-between items-center"
                  >
                    <span>{course.name}</span>
                    <i
                      className={`mdi mdi-chevron-${
                        openDropdown === course.name ? "up" : "down"
                      } transition`}
                    ></i>
                  </button>

                  {openDropdown === course.name && (
                    <ul className="ml-6 mt-2 flex flex-col gap-2 text-[15px]">
                      {Object.entries(course.subjects).map(
                        ([level, subjects]) => (
                          <li key={level}>
                            <button
                              onClick={() =>
                                setOpenSubDropdown(
                                  openSubDropdown === level ? null : level
                                )
                              }
                              className="menu-link w-full flex justify-between items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded"
                            >
                              {level}
                              <i
                                className={`mdi mdi-chevron-${
                                  openSubDropdown === level ? "up" : "down"
                                } transition`}
                              ></i>
                            </button>

                            {openSubDropdown === level && (
                              <ul className="ml-4 mt-2 flex flex-col gap-1 text-[13px]">
                                {subjects.map((subject) => (
                                  <li key={subject}>
                                    <button
                                      onClick={() => {
                                        setSelectedSubject(subject);
                                        setIsMobileMenuOpen(false); // Close mobile menu when selecting a subject
                                      }}
                                      className="menu-link block px-6 py-2 text-gray-500 hover:bg-gray-300 rounded text-left w-full"
                                    >
                                      {subject}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 pt-48 px-8 overflow-y-auto ">
        {/* Subject title and search bar */}

        <div className="flex justify-between items-center mb-6 max-sm:flex-col gap-3">
          <div className="flex flex-row justify-center items-center gap-2">
            <div className="lg:hidden mt-2 mr-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-700"
              >
                <FaBars className="text-xl" />
              </button>
            </div>
            <h2 className="text-2xl font-normal">{selectedSubject}</h2>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search videos..."
            className="border px-4 py-2 rounded-md w-72"
          />
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-5">
            {filteredVideos.slice(0, visibleCount).map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                videoStats={videoStats}
                handleVideoClick={(selectedVideo) =>
                  console.log("Clicked video:", selectedVideo)
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-lg mt-10">
            No videos available
          </p>
        )}

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
    </div>
  );
}
