import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });
  const [image, setImage] = useState(null); // ⬅️ Image state
  const API = import.meta.env.VITE_REACT_APP_API;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, phone, email, address, password } = formData;
  
    if (!name || !phone || !email || !password || !address) {
      toast.error("All fields are required!");
      return;
    }
  
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
  
    const formPayload = new FormData();
    formPayload.append("name", name);
    formPayload.append("phone", phone);
    formPayload.append("email", email);
    formPayload.append("address", address);
    formPayload.append("password", password);
    if (image) {
      formPayload.append("image", image);
    }
  
    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        body: formPayload, // DO NOT set Content-Type manually
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("User registered successfully!");
        setFormData({ name: "", phone: "", email: "", password: "", address: "" });
        setImage(null);
      } else {
        toast.error(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Error during signup: ", error);
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-4">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-indigo-500 text-center mb-6">Create an Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Existing Inputs */}
          {["name", "phone", "email", "password", "address"].map((field) => (
            <div key={field}>
              <label className="block text-gray-400 mb-1 capitalize">{field}</label>
              <input
                type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                name={field}
                placeholder={`Enter your ${field}`}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>
          ))}

          {/* Image Upload Input */}
          <div>
            <label className="block text-gray-400 mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-gray-700 text-white p-2 rounded-lg"
              
            />
          </div>

          <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 transition duration-300 py-2 rounded-lg text-lg font-semibold">
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}
