import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Blackdiv() {
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black text-white text-sm py-2 px-6 z-50 max-sm:px-1">
      <div className="flex justify-end gap-2">
        {user ? (
          <button onClick={handleLogout} className="Blackdiv-But">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="Blackdiv-But">
              Sign in
            </Link>
            <Link to="/signup" className="Blackdiv-But">
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Blackdiv;
