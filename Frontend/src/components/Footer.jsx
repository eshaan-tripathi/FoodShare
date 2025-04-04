export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">FoodShare</h2>
            <p className="text-gray-400 text-lg">
              FoodShare connects surplus food providers with those in need, reducing waste and fighting hunger. It enables donations from restaurants, NGOs, and individuals to support underprivileged communities.
            </p>
          </div>

          {/* Middle Section (About & Contact) */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h3 className="text-xl font-semibold text-indigo-400">Company</h3>
            <a href="/about" className="hover:text-indigo-500 transition-colors text-lg">About</a>
            <a href="/contact" className="hover:text-indigo-500 transition-colors text-lg">Contact Us</a>
          </div>

          {/* Right Section (Other Links) */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h3 className="text-xl font-semibold text-indigo-400">Legal</h3>
            <a href="/terms" className="hover:text-indigo-500 transition-colors text-lg">Terms</a>
            <a href="/privacy" className="hover:text-indigo-500 transition-colors text-lg">Privacy</a>
            <a href="/legal" className="hover:text-indigo-500 transition-colors text-lg">Legal</a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-6 border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-sm">Copyright © 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
