import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          🏢 FoodShare
        </h1>

        {/* NGO Members */}
        <div className="mb-8 border-b border-gray-700 pb-6">
          <h2 className="text-2xl font-semibold text-gray-300 mb-3">NGO Members</h2>
          <ul className="text-gray-400 space-y-2">
            <li>• Eshaan Tripathi</li>
            <li>• Goutam Das</li>
            <li>• Aryan</li>
            <li>• Chandrakant Kumar</li>
          </ul>
        </div>

        {/* Mission */}
        <div className="mb-8 border-b border-gray-700 pb-6">
          <h2 className="text-2xl font-semibold text-gray-300 mb-3">📜 Mission</h2>
          <p className="text-gray-400 leading-relaxed">
            FoodShare was started in collaboration with Chitkara University with
            the mission of reducing food waste and distributing surplus food to
            those in need. We aim to create a sustainable and compassionate
            society by ensuring no food goes to waste.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-300 mb-3">📞 Contact</h2>
          <p className="text-gray-400">Email: <span className="text-indigo-400">contact@foodshare.org</span></p>
          <a href="tel:+919876543210" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            <span className="text-gray-400">Phone:</span> +91 9876543210
          </a>
        </div>
      </div>
    </div>
  );
}
