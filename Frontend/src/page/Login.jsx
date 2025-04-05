import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logoutUser } from "../../Redux/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const API = import.meta.env.VITE_REACT_APP_API;
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from reloading
  
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store only "auth" in localStorage
        localStorage.setItem("auth", JSON.stringify(data));
  
        // Dispatch Redux action (ensure this does NOT store "user" separately)
        dispatch(loginSuccess(data));
  
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong, try again!");
    }
  };
  
  
  

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-indigo-500 text-center mb-6">
          {user ? `Welcome, ${user.name}!` : "Welcome Back"}
        </h2>

        {!user ? (
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-400 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 transition duration-300 py-2 rounded-lg text-lg font-semibold"
            >
              Login
            </button>
          </form>
        ) : (
          <div className="text-center">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 transition duration-300 py-2 rounded-lg text-lg font-semibold mt-4"
            >
              Logout
            </button>
          </div>
        )}

        {!user && (
          <>
          <div>
          <p className="text-gray-400 text-center mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-500 hover:underline">
              Sign up
            </a>
          </p>
          </div>
          <div>
          <p className="text-gray-400 text-center mt-4">
            
            <a href="/forgotpassword" className="text-indigo-500 hover:underline">
             Forgot Password
            </a>
          </p>
          </div>
          </>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}
