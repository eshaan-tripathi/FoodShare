import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/authSlice";

export default function Profile() {
  const { email } = useParams(); // Get email from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const user = useSelector((state) => state.auth.user); // Logged-in user
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // Fallback for local dev

  useEffect(() => {
    if (!email) {
      navigate("/login"); // Redirect if email is missing
      return;
    }
    fetchProfile(email);
  }, [email, navigate]);

  const fetchProfile = async (email) => {
    try {
      const response = await fetch(`${API_URL}/api/profile/${email}`);
      console.log("Fetching:", `${API_URL}/api/profile/${email}`); // Debugging

      if (response.status === 404) {
        setNotFound(true);
        return;
      }
      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  if (notFound) {
    return (
      <section className="bg-gray-800 text-white min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-extrabold text-red-500 mb-6">No Profile Found</h1>
        <p className="text-lg text-gray-300">The profile for <span className="text-indigo-400">{email}</span> does not exist.</p>
        <button 
          onClick={() => navigate("/")}
          className="mt-6 bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Go Home
        </button>
      </section>
    );
  }

  return (
    <section className="bg-gray-800 text-white py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-extrabold mb-6">User Profile</h1>
         

          {loading ? (
            <p className="text-lg text-gray-300">Loading profile...</p>
          ) : error ? (
            <p className="text-lg text-red-500">{error}</p>
          ) : (
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-indigo-500">{profile?.name || "User Name"}</h2>
              <p className="text-lg mt-2">{profile?.email || "user@example.com"}</p>
              <p className="text-lg mt-2">Address: {profile?.address || "N/A"}</p>
              <p className="text-lg mt-2">Phone: {profile?.phone || "N/A"}</p>

              {/* ✅ Only show buttons if logged-in user is viewing their own profile */}
              {user && user.email === email && (
                <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <button className="cursor-pointer bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300">
                    <a href={`/profile/${user.email}/edit-profile`}>Edit Profile</a>
                  </button>
                  <button className="bg-transparent border-2 border-indigo-500 text-indigo-500 py-2 px-6 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-300">
                    <a href={`/claimed/${user.email}`}  rel="noopener noreferrer">
                      Claimed Food
                    </a>
                  </button>
                  <button className="bg-transparent border-2 border-indigo-500 text-indigo-500 py-2 px-6 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-300">
                    <a href={`/donated/${user.email}`}  rel="noopener noreferrer">
                      Donated Food
                    </a>
                  </button>
                  <button
                    onClick={handleLogout}
                    className=" cursor-pointer bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center ml-6">
          <img
            src="https://i.pravatar.cc/200"
            alt="Profile"
            className="max-w-full h-auto rounded-full border-4 border-indigo-500"
          />
        </div>
      </div>
    </section>
  );
}
