import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DonatedFood = () => {
  const { email } = useParams(); // Extract email from URL
  const [donatedFood, setDonatedFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const userEmail = user?.email;
  const API = import.meta.env.VITE_REACT_APP_API;
  useEffect(() => {
    if (!userEmail) return; // Ensure userEmail is available before fetching

    const fetchDonatedFood = async () => {
      try {

        let auth = localStorage.getItem("auth");
        auth = JSON.parse(auth);
        const token = auth.token;
         // Retrieve token from localStorage
        const response = await fetch(`${API}/api/food/donated/${userEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in header
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log(data);
        setDonatedFood(data); // Update state with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donated food:", error);
        setLoading(false);
      }
    };

    fetchDonatedFood();
  }, [userEmail]); // Dependency should be userEmail, not email

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold text-center text-green-500 mb-6">
        Donated Food List for {email || userEmail}
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : donatedFood.length === 0 ? (
        <p className="text-center text-gray-400">No donated food found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-gray-800 shadow-lg rounded-lg">
            <thead className="bg-green-600">
              <tr>
                <th className="py-2 px-4 text-left">Food Name</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Location</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Claimed By</th>
                
              </tr>
            </thead>
            <tbody>
              {donatedFood.map((food, index) => (
               
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-2 px-4">{food?.name || "Unknown"}</td>
                  <td className="py-2 px-4">{food?.quantity || "N/A"}</td>
                  <td className="py-2 px-4">{food?.location || "N/A"}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        food?.status === "Claimed"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      {food?.status || "N/A"}
                    </span>
                  </td>
                  <td className="p-3 bg-white text-green-600 text-center">
                   { food.claimerEmail==null?"N/A":
                    <a href={`/profile/${food.claimerEmail}`}>
                    {food.claimerName}
                    </a>
                   }
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonatedFood;
