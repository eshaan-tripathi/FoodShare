import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function DonateFood() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [locationLoading, setLocationLoading] = useState(false);

  const [foodData, setFoodData] = useState({
    foodName: "",
    category: "Human",
    quantity: "",
    location: "",
    phone: "",
  });
  const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_API;
  const API = import.meta.env.VITE_REACT_APP_API;
  let data = JSON.parse(localStorage.getItem("auth"));
  
  const handleChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      setLocationLoading(true); // Start loader
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
            );
  
            if (response.data.status === "OK" && response.data.results.length > 0) {
              setFoodData((prev) => ({
                ...prev,
                location: response.data.results[0].formatted_address,
                latitude,
                longitude,
              }));
              toast.success("Location fetched successfully!");
            } else {
              toast.error("Could not fetch exact location.");
            }
          } catch (error) {
            toast.error("Failed to fetch location.");
          } finally {
            setLocationLoading(false); // Stop loader
          }
        },
        (error) => {
          toast.error("Please allow location access.");
          setLocationLoading(false); // Stop loader even on error
        },
        { enableHighAccuracy: true }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post(
        `${API}/api/food/add`,
        {
          ...foodData,
          donorContactNo: foodData.phone,
        },
        {
          headers: { Authorization: `Bearer ${data.token}` },
        }
      );
  
      toast.success("Food donated successfully!");
  
      // Clear form fields ✅
      setFoodData({
        foodName: "",
        category: "Human",
        quantity: "",
        location: "",
        phone: "",
      });
  
      // Redirect after a short delay ✅
      setTimeout(() => {
        navigate(`/donated/${user.email}`);
      }, 1000);
    } catch (error) {
      toast.error("Failed to donate food");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-indigo-500 text-center mb-6">
          Donate Food
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="foodName"
            placeholder="Food Name"
            value={foodData.foodName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
          <select
            name="category"
            value={foodData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          >
            <option value="Human">Human</option>
            <option value="Animal">Animal</option>
          </select>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity (in kgs)"
            value={foodData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
          <div className="flex gap-2">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={foodData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
             disabled
            />
            <button
  type="button"
  onClick={getLocation}
  disabled={locationLoading}
  className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
    locationLoading
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-indigo-500 hover:bg-indigo-600"
  }`}
>
  {locationLoading ? (
    <span className="flex items-center gap-2">
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      Fetching...
    </span>
  ) : (
    "Get Location"
  )}
</button>

          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={foodData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 transition duration-300 py-2 rounded-lg text-lg font-semibold"
          >
            Donate
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
