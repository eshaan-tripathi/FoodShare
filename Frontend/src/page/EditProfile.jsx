import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Profile State
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [password, setPassword] = useState(""); // Separate state for password
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!email) {
      navigate("/login");
      return;
    }

    if (user?.email !== email) {
      navigate("/unauthorized");
      return;
    }

    fetchProfile(email);
  }, [email, navigate, user]);

  const fetchProfile = async (email) => {
    try {
      const response = await fetch(`${API_URL}/api/profile/${email}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...profile };
    
    if (password) {
      updatedData.password = password; // Include password only if changed
    }

    try {
      const response = await fetch(`${API_URL}/api/profile/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      navigate(`/profile/${email}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="bg-gray-800 text-white min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-indigo-500 text-center mb-6">
          Edit Profile
        </h2>

        {loading ? (
          <p className="text-gray-300 text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 border border-gray-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-300">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300">Address</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-300">Update Password</label>
              <input
                type="password"
                name="password"
                value={password} // Always empty initially
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate(`/profile/${email}`)}
                className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default EditProfile;
