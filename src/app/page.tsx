'use client'

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        .custom-purple-button {
          background: linear-gradient(to right, #6A0DAD, #8E44AD);
          transition: all 0.3s ease;
        }
        .custom-purple-button:hover {
          background: linear-gradient(to right, #5A0B9D, #7E3A9D);
          transform: scale(1.05);
        }
      `}</style>
      
      {/* Header Section */}
      <header className="text-white py-16 px-4 rounded-b-3xl" style={{background: 'linear-gradient(to right, #6A0DAD, #8E44AD)'}}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">GrowVest</h1>
          <p className="text-lg md:text-xl opacity-90">
            Empowering Your Financial Future Through Smart Investing
          </p>
        </div>
      </header>

      {/* What We're Building Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            What We're Building 🚀
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            India's Gen Z is ambitious but often faces an "Aspiration-Action Gap," struggling 
            with impulsive spending and a lack of financial clarity. Growvest is a mobile app 
            designed to bridge this gap.
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            We empower young adults by providing:
          </p>
          
          <div className="grid gap-4 max-w-lg mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6" style={{color: '#6A0DAD'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-left">Effortless Spending Clarity</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6" style={{color: '#6A0DAD'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-left">Personalised Goal Journeys</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6" style={{color: '#6A0DAD'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-left">Trust through Proactive Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Join Our Community & Build With Us! 🤝
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We believe in building Growvest in public. Share your ideas, get sneak peeks, and 
              help us shape the future of personal finance for Gen Z!
            </p>
            <a 
              href="https://chat.whatsapp.com/BSvNztVhvGiGy5lE1Wyx7l" 
              target="_blank" 
              rel="noopener noreferrer"
              className="custom-purple-button inline-block text-white font-semibold py-4 px-8 rounded-full shadow-lg"
            >
              Join WhatsApp Community
            </a>
          </div>
        </div>
      </section>

      {/* Learn With Us Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Learn With Us 📚
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're passionate about demystifying finance. Check out Dereen's videos where 
              he shares insights and tips to help you build financial confidence.
            </p>
            <a 
              href="https://www.youtube.com/@GrowVest_25" 
              target="_blank" 
              rel="noopener noreferrer"
              className="custom-purple-button inline-block text-white font-semibold py-4 px-8 rounded-full shadow-lg"
            >
              Watch YouTube Playlist
            </a>
          </div>
        </div>
      </section>

      {/* Sneak Peek Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Sneak Peek: The GrowVest App
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get a glimpse of what's coming! Our mobile app will put the power of smart investing 
              right in your pocket, with intuitive design and powerful features.
            </p>
            
            {/* App Preview Placeholder */}
            <a 
              href="https://www.figma.com/proto/ggtpnTXHPSHY77CCNPHCvr/Untitled?node-id=12-370&t=M45qRUBaYimlM9v9-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=12%3A370" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-gray-100 rounded-2xl shadow-xl p-8 max-w-md mx-auto hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#6A0DAD'}}>
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{color: '#6A0DAD'}}>GrowVest App</h3>
                  <p style={{color: '#6A0DAD'}}>Click to Preview!</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">GrowVest</h3>
          <p className="text-gray-300 mb-6">
            Empowering Your Financial Future Through Smart Investing
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © 2024 GrowVest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
