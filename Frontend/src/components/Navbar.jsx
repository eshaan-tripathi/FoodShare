import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // ✅ Import Redux
import { logoutUser } from "../../Redux/authSlice"; // ✅ Import logout action
import { Menu, X, User } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // ✅ Get user from Redux
  const dispatch = useDispatch(); // ✅ Redux Dispatch
  console.log(user);
  const handleLogout = () => {
    dispatch(logoutUser()); 
    // ✅ Logout action triggers Redux update
  
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md relative z-100">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold hover:text-indigo-500">
          FoodShare
        </a>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-indigo-500">Home</a>
          <a href="/about" className="hover:text-indigo-500">About</a>
          <a href="/food-available" className="hover:text-indigo-500">Food Available</a>
          <a href="/donate" className="hover:text-indigo-500">Donate</a>

          {user ? (
            <div className="relative group">
              {/* User Name & Icon (Hoverable) */}
              <div className="flex items-center space-x-2 cursor-pointer hover:text-indigo-500">
                <User size={20} />
                <span>Hi, {user?.name.split(" ")[0]}</span>
              </div>

              {/* Dropdown on Hover */}
              <div className="absolute left-1 right-0 mt-2 w-40 bg-gray-700 text-white shadow-lg rounded-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href={`/profile/${user.email}`} className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-600">
                  Go to Profile
                </a>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <a href="/login" className="hover:text-indigo-500">Sign In</a>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900 text-white shadow-lg z-100">
          <a href="/" className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-700">Home</a>
          <a href="/about" className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-700">About</a>
          <a href="/food-available" className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-700">Food Available</a>
          <a href="/donate" className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-700">Donate</a>

          {user ? (
            <>
              <a href={`/profile/${user.email}`} className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-700">
                Go to Profile
              </a>
              <button
                className="block w-full text-left px-4 py-3 hover:bg-gray-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/login" className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-700">Sign In</a>
          )}
        </div>
      )}
    </nav>
  );
}
