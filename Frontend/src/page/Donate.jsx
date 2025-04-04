import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function DonateFood() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [foodData, setFoodData] = useState({
    foodName: "",
    category: "Human",
    quantity: "",
    location: "",
    phone: "",
  });

  let data = JSON.parse(localStorage.getItem("auth"));

  const handleChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const API_KEY = "AIzaSyCNbMJcfk6IcsJayqknukXIoWHK5UqaxCI"; // Replace with actual API Key
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
            );
            console.log("Google API Response:", response.data);
  
            if (response.data.status === "OK" && response.data.results.length > 0) {
              setFoodData({
                ...foodData,
                location: response.data.results[0].formatted_address,
                latitude, 
                longitude,
              });
              toast.success("Location fetched successfully!");
            } else {
              toast.error("Could not fetch exact location.");
            }
          } catch (error) {
            console.error("Google API Error:", error);
            toast.error("Failed to fetch location.");
          }
        },
        (error) => {
          console.error("Geolocation Error:", error);
          toast.error("Please allow location access.");
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
        "http://localhost:5000/api/food/add",
        {
          ...foodData,
          donorContactNo: foodData.phone,
        },
        {
          headers: { Authorization: `Bearer ${data.token}` },
        }
      );
      toast.success("Food donated successfully!");
      setTimeout(() => {
        navigate('/food-available');
      }, 2000);
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
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg font-semibold"
            >
              Get Location
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
