import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchWatchHistory = async (uid) => {
    try {
      const historyRef = collection(db, "users", uid, "history");
      const historySnapshot = await getDocs(historyRef);
      const historyData = historySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHistory(historyData);
    } catch (error) {
      console.error("Error fetching history:", error);
      toast.error("Failed to load watch history.");
    }
  };

  const clearHistory = async () => {
    try {
      const historyRef = collection(db, "users", user.uid, "history");
      const historySnapshot = await getDocs(historyRef);

      const deletePromises = historySnapshot.docs.map(docItem => 
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
        <p className="text-gray-700 text-lg font-normal text-center">Please log in to view your profile and watch history.</p>
        <button 
          onClick={() => navigate("/login")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-44 flex flex-col justify-center items-center max-sm:p-3">
      <h1 className="text-6xl font-normal overflow-hidden text-gray-800 max-sm:text-4xl ">Welcome, {user.name || "User"}!</h1>
      <h2 className="text-xl font-semibold mt-4 text-gray-700">Watch History</h2>
      {history.length > 0 ? (
        <ul className="mt-2">
          {history.map(video => (
            <li key={video.id} className="border-b py-2">
              <a href={`https://www.youtube.com/watch?v=${video.videoId}`} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-blue-600 hover:underline">
                {video.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-2">No watch history yet.</p>
      )}
      {history.length > 0 && (
        <button 
          onClick={clearHistory} 
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Clear History
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
