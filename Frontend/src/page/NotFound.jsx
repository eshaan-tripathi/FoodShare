import { useEffect, useState } from "react";

export default function NotFound() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      {/* Error Code */}
      <h1 className="text-8xl font-extrabold text-indigo-500 animate-pulse">
        404
      </h1>

      {/* Error Message */}
      <h2 className="text-2xl font-semibold mt-4">
        Oops! Page Not Found<span className="animate-blink">{dots}</span>
      </h2>

      {/* Description */}
      <p className="text-gray-400 mt-2 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Home Button */}
      <a
        href="/"
        className="mt-6 px-6 py-2 text-lg font-semibold bg-indigo-500 hover:bg-indigo-600 rounded-lg transition duration-300"
      >
        Go Home
      </a>
    </div>
  );
}
