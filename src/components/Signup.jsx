import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update the user's display name
      await updateProfile(user, {
        displayName: name,
      });
  
      // Send email verification
      await sendEmailVerification(user);
      toast.success("Account created! Please check your email for verification.");
      
      navigate("/login"); // Redirect to login after signup
    } catch (err) {
      toast.error(err.message);
    }
  
    setLoading(false);
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f6ff] p-2">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Sign Up Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-medium text-center text-blue-600">Create an Account</h2>
          <p className="text-gray-600 text-center mt-2">Join EduTech today!</p>

          <form className="mt-6" onSubmit={handleSignup}>
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Log In
            </Link>
          </p>
        </div>
        <div className="hidden md:flex w-1/2 bg-blue-600">
          <img
            src="\img\signup.gif"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
