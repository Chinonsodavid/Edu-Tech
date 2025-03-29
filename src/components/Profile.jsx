import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import VideoCard from "./VideoCard";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({ name: currentUser.displayName, uid: currentUser.uid });
        fetchWatchHistory(currentUser.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchWatchHistory = async (uid) => {
    try {
      const historyRef = collection(db, "users", uid, "history");
      console.log("Fetching from:", `users/${uid}/history`); // Log the exact Firestore path
  
      const historySnapshot = await getDocs(historyRef);
  
      if (historySnapshot.empty) {
        console.log("No history found in Firestore");
      }
  
      const historyData = historySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("Fetched History:", historyData); // Debugging log
  
      setHistory(historyData);
    } catch (error) {
      console.error("Error fetching history:", error);
      toast.error("Failed to load watch history.");
    } finally {
      setLoading(false);
    }
  };
  

  const clearHistory = async () => {
    if (!user) return;

    try {
      const historyRef = collection(db, "users", user.uid, "history");
      const historySnapshot = await getDocs(historyRef);

      const deletePromises = historySnapshot.docs.map((docItem) =>
        deleteDoc(doc(db, "users", user.uid, "history", docItem.id))
      );
      await Promise.all(deletePromises);

      setHistory([]);
      toast.success("Watch history cleared.");
    } catch (error) {
      console.error("Error clearing history:", error);
      toast.error("Failed to clear history.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-44 flex flex-col justify-center items-center">
        <p className="text-gray-700 text-lg font-normal text-center">
          Please log in to view your profile and watch history.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-44 flex flex-col items-center">
      <h1 className="text-6xl font-normal text-gray-800 max-sm:text-4xl overflow-hidden">
        Welcome, {user.name || "User"}!
      </h1>
      <h2 className="text-xl font-semibold mt-4 text-gray-700 ">Watch History</h2>

      {history.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6 p-5">
          {history.map((video) =>
            video?.videoId && video?.title ? (
              <VideoCard key={video.id} video={video} videoStats={{}} handleVideoClick={() => {}} />
            ) : (
              <p key={video.id} className="text-red-500">Invalid video data</p>
            )
          )}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No watch history yet.</p>
      )}

      {history.length > 0 && (
        <button
          onClick={clearHistory}
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600"
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
