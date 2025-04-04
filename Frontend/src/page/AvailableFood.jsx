import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const mapContainerStyle = { width: "100%", height: "400px" };
const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Default center (India)

export default function AvailableFood() {
  const user = useSelector((state) => state.auth.user);
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();
  const API_KEY = "AIzaSyCNbMJcfk6IcsJayqknukXIoWHK5UqaxCI"; // Store in .env

  useEffect(() => {
    async function fetchFoodItems() {
      try {
        const response = await axios.get("http://localhost:5000/api/food/available");
        const filteredFoodItems = response.data.filter(item => item.emailid !== user.email);
        setFoodItems(filteredFoodItems);
      } catch (error) {
        toast.error("Failed to fetch food items");
      }
    }
    fetchFoodItems();
  }, []);

  const handleClaimFood = async (foodId) => {
    try {
      let auth = localStorage.getItem("auth");
      auth = JSON.parse(auth);
      const token = auth.token; // Retrieve the token
  
      await axios.put(
        `http://localhost:5000/api/food/claim/${foodId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
          withCredentials: true, // Ensure credentials are included
        }
      );
  
      toast.success("Food claimed successfully!");
      setFoodItems((prev) => prev.filter((item) => item._id !== foodId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to claim food");
      console.log(foodId);
    }
  };
  

  const mapCenter = foodItems.length > 0
    ? { lat: Number(foodItems[0].latitude), lng: Number(foodItems[0].longitude) }
    : defaultCenter;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 px-4 py-6">
      <h2 className="text-3xl font-bold text-indigo-500 mb-6">Available Food</h2>

      {/* Food List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div key={item._id} className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
              <a href={`/profile/${item.emailid}`}>
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded" />
                <p className="text-indigo-300">Donor: {item.donorName}</p>
                <h3 className="text-xl font-semibold text-indigo-400 mt-2">{item.name}</h3>
                <p className="text-gray-400">{item.location}</p>
                <p className="text-green-400 font-bold">{item.quantity} kg available</p>
                <p className="text-yellow-300">Category: {item.category}</p>
                <p className="text-gray-300">Posted: {new Date(item.postedAt).toLocaleString()}</p>
                <p className="text-indigo-200">Contact: {item.donorContactNo}</p>
              </a>
              <button 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => handleClaimFood(item._id)}

              >
                Claim
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No food items available.</p>
        )}
      </div>

      {/* Google Maps */}
      <div className="w-full max-w-4xl mt-6">
        <LoadScriptNext googleMapsApiKey={API_KEY}>
          <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={10}>
            {foodItems.map((item) =>
              item.latitude && item.longitude ? (
                <Marker
                  key={item._id}
                  position={{ lat: Number(item.latitude), lng: Number(item.longitude) }}
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
