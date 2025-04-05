import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const mapContainerStyle = { width: "100%", height: "400px" };
const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // India

export default function AvailableFood() {
  const user = useSelector((state) => state.auth.user);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_API;
  const API = import.meta.env.VITE_REACT_APP_API;

  useEffect(() => {
    async function fetchFoodItems() {
      try {
        const response = await axios.get(`${API}/api/food/available`);
        const filtered = response.data.filter((item) => item.emailid !== user.email);
        setFoodItems(filtered);
      } catch (error) {
        toast.error("Failed to fetch food items");
      } finally {
        setLoading(false);
      }
    }
    fetchFoodItems();
  }, []);

  const handleClaimFood = async (foodId) => {
    setClaimingId(foodId);
    try {
      let auth = localStorage.getItem("auth");
      auth = JSON.parse(auth);
      const token = auth.token;

      await axios.put(
        `${API}/api/food/claim/${foodId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Food claimed successfully!");
      setFoodItems((prev) => prev.filter((item) => item._id !== foodId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to claim food");
    } finally {
      setClaimingId(null);
    }
  };

  // Filter logic based on selected category
  const filteredItems =
    selectedCategory === "All"
      ? foodItems
      : foodItems.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase());

  const mapCenter =
    filteredItems.length > 0
      ? { lat: Number(filteredItems[0].latitude), lng: Number(filteredItems[0].longitude) }
      : defaultCenter;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 px-4 py-6">
      <h2 className="text-3xl font-bold text-indigo-500 mb-4">Available Food</h2>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {["All", "Human", "Animal"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`py-2 px-4 rounded-lg font-semibold transition duration-300 ${
              selectedCategory === category
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-indigo-500 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading ? (
        <div className="text-white flex flex-col items-center justify-center mt-10">
          <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mb-2"></div>
          <p>Loading available food...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800 text-white p-4 rounded-lg shadow-lg"
              >
                <a href={`/profile/${item.emailid}`}>
                  <img
                    src="https://th.bing.com/th/id/OIP.1Q6rU0xh3CwSItUZT7ThlwHaEW?w=326&h=191&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                    alt={item.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <p className="text-indigo-300">Donor: {item.donorName}</p>
                  <h3 className="text-xl font-semibold text-indigo-400 mt-2">{item.name}</h3>
                  <p className="text-gray-400">{item.location}</p>
                  <p className="text-green-400 font-bold">{item.quantity} kg available</p>
                  <p className="text-yellow-300">Category: {item.category}</p>
                  <p className="text-gray-300">Posted: {new Date(item.postedAt).toLocaleString()}</p>
                  <p className="text-indigo-200">Contact: {item.donorContactNo}</p>
                </a>
                <button
                  className={`${
                    claimingId === item._id
                      ? "bg-gray-500"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white font-bold py-2 px-4 rounded mt-2 flex items-center justify-center`}
                  onClick={() => handleClaimFood(item._id)}
                  disabled={claimingId === item._id}
                >
                  {claimingId === item._id ? (
                    <span className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                  ) : (
                    "Claim"
                  )}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No food items available for this category.</p>
          )}
        </div>
      )}

      {/* Google Maps */}
      <div className="w-full max-w-4xl mt-6">
        <LoadScriptNext googleMapsApiKey={API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={10}
          >
            {filteredItems.map((item) =>
              item.latitude && item.longitude ? (
                <Marker
                  key={item._id}
                  position={{
                    lat: Number(item.latitude),
                    lng: Number(item.longitude),
                  }}
                  title={item.name}
                />
              ) : null
            )}
          </GoogleMap>
        </LoadScriptNext>
      </div>

      <button
        onClick={() => navigate("/donate")}
        className="mt-6 bg-indigo-500 hover:bg-indigo-600 transition duration-300 py-2 px-6 rounded-lg text-lg font-semibold"
      >
        Donate Food
      </button>

      <ToastContainer />
    </div>
  );
}
