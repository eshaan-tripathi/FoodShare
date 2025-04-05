import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../Redux/authSlice";

const EditProfile = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

 
  const API = import.meta.env.VITE_REACT_APP_API;
  // Profile State
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const locdata = JSON.parse(localStorage.getItem("auth"));

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
      const response = await fetch(`${API}/api/user/${email}/edit-profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${locdata.token}`,
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

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("phone", profile.phone);
    formData.append("address", profile.address);
    if (password) formData.append("password", password);
    if (profile.imageFile) formData.append("image", profile.imageFile);

    try {
      const response = await fetch(`${API}/api/user/${email}/edit-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${locdata.token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();

      // ✅ Merge old and new user data
      const mergedUser = { ...user, ...updatedUser };

      // ✅ Dispatch to Redux
      dispatch(loginSuccess({ user: mergedUser }));

      // ✅ Update localStorage
      const updatedAuth = {
        ...locdata,
        user: mergedUser,
      };
      localStorage.setItem("auth", JSON.stringify(updatedAuth));

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
              <label className="block text-gray-300">Profile Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setProfile({ ...profile, imageFile: e.target.files[0] })
                }
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
              />

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
                value={password}
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
