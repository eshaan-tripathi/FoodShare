export default function ContactUs() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        {/* Header */}
        <h2 className="text-3xl font-bold text-indigo-500 text-center mb-6">
          Contact Us
        </h2>

        {/* Form */}
        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-gray-400 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-gray-400 mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 transition duration-300 py-2 rounded-lg text-lg font-semibold"
          >
            Send Message
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-gray-400 text-center mt-4">
          Have questions?{" "}
          <a href="mailto:eshaantripathi09@gmail.com" className="text-indigo-500 hover:underline">
            Email us directly
          </a>
        </p>
      </div>
    </div>
  );
}
