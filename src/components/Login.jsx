import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        setLoading(false);
        return;
      }
  
      // Save token to local storage
      localStorage.setItem("authToken", user.accessToken); 
      localStorage.setItem("userEmail", user.email); 
  
      toast.success("Login successful! 🎉");
      navigate("/home"); // Redirect after successful login
    } catch (err) {
      toast.error(err.message);
    }
  
    setLoading(false);
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f6ff] p-2">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-medium text-center text-blue-600">
            Welcome Back to EduTech
          </h2>
          <p className="text-gray-600 text-center mt-2">Log in to continue</p>

          <form className="mt-6" onSubmit={handleLogin}>
            <div>
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
                placeholder="Enter your password"
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
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
        <div className="hidden md:flex w-1/2 bg-blue-600">
          <img
            src="\img\login.gif"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
