export default function Testimonials() {
  return (
    <section className="bg-gray-800 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Here's what our users said
        </h2>

        <p className="text-lg text-center text-white mb-8">
          These are the testimonials of our users, sharing how Food Share has made a difference in their lives and communities. Their stories inspire us to continue working towards a world where no food goes to waste.
        </p>

        {/* Testimonial 1 */}
        <div className="p-6 bg-white rounded-lg shadow-md mb-6">
          <p className="text-xl text-gray-700 italic mb-4">
            "Food Share has been a life-saver. It’s such a great way to make sure no food goes to waste, and I feel good knowing my donations are making a real difference."
          </p>
          <div className="flex items-center space-x-4">
            <img src="https://th.bing.com/th/id/R.47d1cc4b137f211cb1c3dfa2135bacba?rik=ZyqfGjPxlsy%2fcQ&riu=http%3a%2f%2fgenslerzudansdentistry.com%2fwp-content%2fuploads%2f2015%2f11%2fanonymous-user.png&ehk=dJX%2fxGNqMoZrDjZmTuHpot4p8blz6HCbhb%2bTyBYlXDU%3d&risl=&pid=ImgRaw&r=0" alt="Sarah Steiner" className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold">Sarah Steiner</p>
              <p className="text-sm text-gray-500">VP Sales at Google</p>
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="p-6 bg-white rounded-lg shadow-md mb-6">
          <p className="text-xl text-gray-700 italic mb-4">
            "As a non-profit, Food Share has been a key partner in helping us feed those in need. The seamless donation process and incredible support have made a huge difference."
          </p>
          <div className="flex items-center space-x-4">
            <img src="https://th.bing.com/th/id/R.47d1cc4b137f211cb1c3dfa2135bacba?rik=ZyqfGjPxlsy%2fcQ&riu=http%3a%2f%2fgenslerzudansdentistry.com%2fwp-content%2fuploads%2f2015%2f11%2fanonymous-user.png&ehk=dJX%2fxGNqMoZrDjZmTuHpot4p8blz6HCbhb%2bTyBYlXDU%3d&risl=&pid=ImgRaw&r=0" alt="Dylan Ambrose" className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold">Dylan Ambrose</p>
              <p className="text-sm text-gray-500">Lead marketer at Netflix</p>
            </div>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="p-6 bg-white rounded-lg shadow-md mb-6">
          <p className="text-xl text-gray-700 italic mb-4">
            "I’ve seen how my small contributions have turned into full meals for families in need. The platform is simple to use, and knowing I’m part of something bigger makes it all worth it!"
          </p>
          <div className="flex items-center space-x-4">
            <img src="https://th.bing.com/th/id/R.47d1cc4b137f211cb1c3dfa2135bacba?rik=ZyqfGjPxlsy%2fcQ&riu=http%3a%2f%2fgenslerzudansdentistry.com%2fwp-content%2fuploads%2f2015%2f11%2fanonymous-user.png&ehk=dJX%2fxGNqMoZrDjZmTuHpot4p8blz6HCbhb%2bTyBYlXDU%3d&risl=&pid=ImgRaw&r=0" alt="Gabrielle Winn" className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold">Gabrielle Winn</p>
              <p className="text-sm text-gray-500">Co-founder of Acme Inc</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
