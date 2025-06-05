"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Home() {
  // Section refs and visibility state
  const whatsappRef = useRef<HTMLElement>(null);
  const youtubeRef = useRef<HTMLElement>(null);
  const sneakPeekRef = useRef<HTMLElement>(null);
  const [showWhatsapp, setShowWhatsapp] = useState(true);
  const [showYoutube, setShowYoutube] = useState(true);
  const [showSneakPeek, setShowSneakPeek] = useState(true);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };
    const observerWhatsapp = new IntersectionObserver(
      ([entry]) => setShowWhatsapp(!entry.isIntersecting),
      options
    );
    const observerYoutube = new IntersectionObserver(
      ([entry]) => setShowYoutube(!entry.isIntersecting),
      options
    );
    const observerContact = new IntersectionObserver(
      ([entry]) => setShowSneakPeek(!entry.isIntersecting),
      options
    );
    if (whatsappRef.current) observerWhatsapp.observe(whatsappRef.current);
    if (youtubeRef.current) observerYoutube.observe(youtubeRef.current);
    if (sneakPeekRef.current) observerContact.observe(sneakPeekRef.current);
    return () => {
      observerWhatsapp.disconnect();
      observerYoutube.disconnect();
      observerContact.disconnect();
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        .custom-purple-button {
          background: linear-gradient(to right, #6a0dad, #8e44ad);
          transition: all 0.3s ease;
        }
        .custom-purple-button:hover {
          background: linear-gradient(to right, #5a0b9d, #7e3a9d);
          transform: scale(1.05);
        }
      `}</style>

      {/* Header Section */}
      <header
        className="text-white py-16 px-4 rounded-b-3xl"
        style={{ background: "linear-gradient(to right, #6A0DAD, #8E44AD)" }}
      >
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
            India's Gen Z is ambitious but often faces an "Aspiration-Action
            Gap," struggling with impulsive spending and a lack of financial
            clarity. GrowVest is a mobile app designed to bridge this gap.
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            We empower young adults by providing:
          </p>

          <div className="grid gap-4 max-w-lg mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6"
                    style={{ color: "#6A0DAD" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 text-left">
                  Effortless Spending Clarity
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6"
                    style={{ color: "#6A0DAD" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 text-left">
                  Personalised Goal Journeys
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6"
                    style={{ color: "#6A0DAD" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 text-left">
                  Proactive Financial Guidance
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section id="whatsapp" ref={whatsappRef} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Join Our Community & Build With Us! 🤝
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We believe in building GrowVest in public. Contribute to the
              development by answering fun polls! Share your ideas, get sneak
              peeks, and help us shape the future of personal finance for Gen Z!
            </p>
            <a
              href="https://chat.whatsapp.com/BSvNztVhvGiGy5lE1Wyx7l"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-purple-button inline-flex items-center justify-center text-white font-semibold py-4 px-8 rounded-full shadow-lg"
            >
              {/* WhatsApp Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path d="M16.04 3.03A12.97 12.97 0 003.05 16a13 13 0 002.1 6.83l-2.3 7.93 8.12-2.33A13 13 0 1016.04 3.03zm0 23.43a10.46 10.46 0 01-5.31-1.45l-.38-.23-4.82 1.39 1.28-4.93-.25-.4a10.5 10.5 0 1110.48 5.62z" />
                <path d="M23.26 18.62c-.38-.19-2.23-1.1-2.58-1.22-.35-.1-.61-.19-.88.19-.26.38-1.06 1.22-1.3 1.47-.24.26-.49.29-.9.1-.38-.19-1.6-.59-3.04-1.87-.56-.5-.94-1.12-1.05-1.5-.11-.38-.01-.59.17-.79.17-.17.38-.44.57-.66.19-.22.26-.38.38-.63.13-.25.06-.47-.03-.66-.1-.19-.88-2.13-1.21-2.93-.32-.78-.65-.67-.88-.68l-.75-.01c-.19 0-.5.07-.76.38s-1 1-1 2.36c0 1.36 1.02 2.68 1.16 2.87.13.19 2 3.05 4.84 4.28.68.29 1.21.46 1.62.59.68.23 1.3.2 1.79.12.55-.09 1.7-.69 1.94-1.36.24-.66.24-1.23.17-1.36-.06-.12-.26-.19-.55-.38z" />
              </svg>
              Join WhatsApp Community
            </a>
          </div>
        </div>
      </section>

      {/* Learn With Us Section */}
      <section id="youtube" ref={youtubeRef} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Learn With Us 📚
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're passionate about demystifying finance. Check out Deven's
              videos where he breaks down complex personal finance topics
              through engaging stories.
            </p>

            {/* Embedded YouTube Playlist */}
            <div className="max-w-3xl mx-auto mb-8">
              <iframe
                width="100%"
                height="450"
                src="https://www.youtube.com/embed/videoseries?list=PLAOCfucQR0MR5LZ6_31CYV7oM2Nad5NgZ"
                title="GrowVest Playlist"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Sneak Peek Section */}
      <section id="sneakpeek" ref={sneakPeekRef} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Sneak Peek: The GrowVest App ✨
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get a glimpse of what's coming! Our mobile app will put the power
              of smart investing right in your pocket, with an intuitive design
              and powerful features.
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
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "#6A0DAD" }}
                  >
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "#6A0DAD" }}
                  >
                    GrowVest App
                  </h3>
                  <p style={{ color: "#6A0DAD" }}>Click to Preview!</p>
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
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="https://wa.me/918368644965"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © 2025 GrowVest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating anchor nav */}
      {(showWhatsapp || showYoutube || showSneakPeek) && (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
          {showWhatsapp && (
            <a
              href="#"
              className="p-3 rounded-full bg-gradient-to-br from-green-700 to-green-800 text-white shadow-[0_8px_15px_rgba(0,0,0,0.3)] transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_12px_20px_rgba(0,0,0,0.35)]"
              onClick={(e) => {
                e.preventDefault();
                whatsappRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="currentColor"
                className="w-6 h-6 filter drop-shadow-md"
              >
                <path d="M16.04 3.03A12.97 12.97 0 003.05 16a13 13 0 002.1 6.83l-2.3 7.93 8.12-2.33A13 13 0 1016.04 3.03zm0 23.43a10.46 10.46 0 01-5.31-1.45l-.38-.23-4.82 1.39 1.28-4.93-.25-.4a10.5 10.5 0 1110.48 5.62z" />
                <path d="M23.26 18.62c-.38-.19-2.23-1.1-2.58-1.22-.35-.1-.61-.19-.88.19-.26.38-1.06 1.22-1.3 1.47-.24.26-.49.29-.9.1-.38-.19-1.6-.59-3.04-1.87-.56-.5-.94-1.12-1.05-1.5-.11-.38-.01-.59.17-.79.17-.17.38-.44.57-.66.19-.22.26-.38.38-.63.13-.25.06-.47-.03-.66-.1-.19-.88-2.13-1.21-2.93-.32-.78-.65-.67-.88-.68l-.75-.01c-.19 0-.5.07-.76.38s-1 1-1 2.36c0 1.36 1.02 2.68 1.16 2.87.13.19 2 3.05 4.84 4.28.68.29 1.21.46 1.62.59.68.23 1.3.2 1.79.12.55-.09 1.7-.69 1.94-1.36.24-.66.24-1.23.17-1.36-.06-.12-.26-.19-.55-.38z" />
              </svg>
            </a>
          )}
          {showYoutube && (
            <a
              href="#"
              className="p-3 rounded-full bg-gradient-to-br from-red-700 to-red-800 text-white shadow-[0_8px_15px_rgba(0,0,0,0.3)] transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_12px_20px_rgba(0,0,0,0.35)]"
              onClick={(e) => {
                e.preventDefault();
                youtubeRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 filter drop-shadow-md"
              >
                <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.8-1.6-.8-2-1C17.7 2.5 12 2.5 12 2.5h0s-5.7 0-8.7.4c-.4 0-1.3.2-2 1-.7.7-.8 2.3-.8 2.3S0 8 .2 9.8v1.4c-.2 1.8.4 3.6.4 3.6s.2 1.6.8 2.3c.8.8 1.8.8 2.2 1 1.6.1 6.7.4 7.5.4s5.7-.2 8.7-.5c.4 0 1.3-.2 2-1 .7-.7.8-2.3.8-2.3s.7-1.9.9-3.7v-1.4c-.3-1.8-.9-3.6-.9-3.6zM9.8 14.4V7.6l6.2 3.4-6.2 3.4z" />
              </svg>
            </a>
          )}
          {showSneakPeek && (
            <a
              href="#"
              className="p-3 rounded-full bg-gradient-to-br from-blue-700 to-blue-800 text-white shadow-[0_8px_15px_rgba(0,0,0,0.3)] transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_12px_20px_rgba(0,0,0,0.35)]"
              onClick={(e) => {
                e.preventDefault();
                sneakPeekRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="w-6 h-6 filter drop-shadow-md"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 18h2M11 6h2"
                />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
