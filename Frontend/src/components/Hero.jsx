import React from "react";

export default function Hero() {
  return (
    <section className="bg-gray-800 text-white py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Column */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-extrabold mb-6">
            Because No One Should Sleep <span className="text-indigo-500">Hungry</span>
          </h1>
          <p className="text-lg mb-6">
            No food should be wasted when millions go hungry. Food Share rescues
            surplus food and delivers it to those in need. Join us to fight hunger
            and reduce waste—one meal at a time.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <button className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300">
              Download for Free
            </button>
            <button className="bg-transparent border-2 border-indigo-500 text-indigo-500 py-2 px-6 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-300">
              <a href="https://github.com/eshaan-tripathi">View on Github</a>
            </button>
          </div>
        </div>

        {/* Right Column (Image or Illustration) */}
        <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center ml-6">
          <img
            src="https://i.kinja-img.com/image/upload/c_fill,h_900,q_60,w_1600/8dce25517395ddaffe7bc2c5dd06ab2e.jpg"
            alt="Hero Illustration"
            className="max-w-full h-auto rounded-2xl"
          />
        </div>
      </div>

      {/* Impact Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6">This is the impact YOU have helped us make</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-indigo-500">50+</h3>
            <p className="text-lg">Meals donated to those in need</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-indigo-500">10+</h3>
            <p className="text-lg">Kgs of food saved from landfills</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-indigo-500">100+</h3>
            <p className="text-lg">Lives impacted through your contributions</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-indigo-500">8+</h3>
            <p className="text-lg">Communities served, bringing hope</p>
          </div>
        </div>
      </div>
    </section>
  );
}
