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

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const today = new Date();
      today.setHours(23, 59, 0, 0); // Set to 11:59 PM today

      // If current time is past 11:59 PM, set target to 11:59 PM tomorrow
      if (now > today) {
        today.setDate(today.getDate() + 1);
      }

      const difference = today.getTime() - now.getTime();

      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes countdown {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-countdown {
          animation: countdown 1s ease-in-out infinite;
        }

        .custom-purple-button {
          background: linear-gradient(135deg, #6a0dad, #8e44ad);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 25px rgba(106, 13, 173, 0.3);
        }
        .custom-purple-button:hover {
          background: linear-gradient(135deg, #5a0b9d, #7e3a9d);
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(106, 13, 173, 0.4);
        }

        .section-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .section-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
        }

        .feature-card {
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .feature-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        .feature-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        .feature-card:nth-child(3) {
          animation-delay: 0.3s;
        }

        .floating-nav {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .nav-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }

        .nav-button:hover::before {
          left: 100%;
        }

        .nav-button:hover {
          transform: translateY(-3px) scale(1.1);
        }

        .whatsapp-button {
          background: linear-gradient(135deg, #25d366, #128c7e);
          color: white;
        }

        .whatsapp-button:hover {
          background: linear-gradient(135deg, #20b954, #0f7a6e);
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
        }

        .youtube-button {
          background: linear-gradient(135deg, #ff0000, #cc0000);
          color: white;
        }

        .youtube-button:hover {
          background: linear-gradient(135deg, #e60000, #b30000);
          box-shadow: 0 10px 25px rgba(255, 0, 0, 0.4);
        }

        .preview-button {
          background: linear-gradient(135deg, #6a0dad, #8e44ad);
          color: white;
        }

        .preview-button:hover {
          background: linear-gradient(135deg, #5a0b9d, #7e3a9d);
          box-shadow: 0 10px 25px rgba(106, 13, 173, 0.4);
        }

        .nav-tooltip {
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 12px;
          padding: 8px 12px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          border-radius: 6px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .nav-tooltip::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-left-color: rgba(0, 0, 0, 0.8);
        }

        .nav-button:hover .nav-tooltip {
          opacity: 1;
        }

        .countdown-digit {
          background: linear-gradient(135deg, #6a0dad, #8e44ad);
          border-radius: 12px;
          color: white;
          font-weight: bold;
          min-width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 8px 25px rgba(106, 13, 173, 0.3);
        }

        .countdown-label {
          font-size: 0.75rem;
          color: #6a0dad;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 8px;
        }

        @media (max-width: 640px) {
          .countdown-digit {
            min-width: 50px;
            height: 50px;
            font-size: 1.25rem;
          }
        }
      `}</style>

      {/* Header Section */}
      <header
        className="text-white py-16 px-4 rounded-b-3xl animate-fadeInDown"
        style={{ background: "linear-gradient(135deg, #6A0DAD, #8E44AD)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 ">Figs</h1>
          <p className="text-lg md:text-xl opacity-90 animate-fadeInUp">
            Empowering Your Financial Future Through Smart Investing
          </p>
        </div>
      </header>

      {/* Countdown and Early Access Form Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          {/* Countdown Timer */}
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
              🚀 Launching App In
            </h2>
            <div className="flex justify-center items-center space-x-4 md:space-x-6 mb-4">
              <div className="text-center">
                <div className="countdown-digit animate-countdown">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="countdown-label">Hours</div>
              </div>
              <div className="text-2xl font-bold text-purple-600">:</div>
              <div className="text-center">
                <div className="countdown-digit animate-countdown">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="countdown-label">Minutes</div>
              </div>
              <div className="text-2xl font-bold text-purple-600">:</div>
              <div className="text-center">
                <div className="countdown-digit animate-countdown">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="countdown-label">Seconds</div>
              </div>
            </div>
          </div>

          {/* Early Access Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg section-card animate-scaleIn">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                🎯 Get Your Hands on the App
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Be among the first to experience Figs! Fill out the form below
                to secure your early access and shape the future of financial
                wellness.
              </p>
            </div>

            {/* Custom Form that submits to Google Forms */}
            <form
              action="https://docs.google.com/forms/d/e/1FAIpQLSfL4uoviXtT3iZueeeOwAKoUJVb8SLpFf5d_dpPR-sAY_zfJQ/formResponse"
              method="POST"
              target="hidden_iframe"
              onSubmit={() => {
                setTimeout(() => {
                  alert(
                    "Thank you! Your response has been submitted successfully. 🎉 \n We'll send you the app link once the countdown reaches 0 on your mail"
                  );
                }, 1000);
              }}
              className="space-y-6"
            >
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="entry.326049074"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="entry.1719872335"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Platform Choice */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Which platform do you primarily use? *
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="entry.572226123"
                      value="Android"
                      required
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <div className="ml-3 flex items-center">
                      <svg
                        className="w-6 h-6 text-green-600 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1518-.5972.416.416 0 00-.5972.1519l-2.0223 3.503c-1.2441-.4871-2.6226-.7637-4.1429-.7637-1.5203 0-2.8988.2766-4.1429.7637L6.8527 5.4069a.4161.4161 0 00-.5972-.1519.4161.4161 0 00-.1519.5972L8.0509 9.3214C4.7178 11.1696 2.5 14.4602 2.5 18.25h19c0-3.7898-2.2178-7.0804-5.5509-8.9286" />
                      </svg>
                      <span className="text-gray-700 font-medium">Android</span>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="entry.572226123"
                      value="iOS"
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <div className="ml-3 flex items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                      <span className="text-gray-700 font-medium">iOS</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center space-y-4">
                <button
                  type="submit"
                  className="custom-purple-button inline-flex items-center justify-center text-white font-semibold py-4 px-8 rounded-full shadow-lg w-full sm:w-auto"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Secure My Early Access
                </button>
              </div>
            </form>

            {/* Hidden iframe for Google Forms submission */}
            <iframe
              name="hidden_iframe"
              id="hidden_iframe"
              style={{ display: "none" }}
              onLoad={() => {
                console.log("Form submitted successfully!");
              }}
            ></iframe>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                🔒 Your information is secure and will only be used to provide
                you with early access to Figs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Building Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 animate-fadeInUp">
            What We're Building 🚀
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeInUp">
            India's Gen Z is ambitious but often faces an "Aspiration-Action
            Gap," struggling with impulsive spending and a lack of financial
            clarity. Figs is a mobile app designed to bridge this gap.
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeInUp">
            We empower young adults by providing:
          </p>

          <div className="grid gap-4 max-w-lg mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg feature-card hover:shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 animate-pulse-gentle"
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

            <div className="bg-white rounded-xl p-6 shadow-lg feature-card hover:shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 animate-pulse-gentle"
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

            <div className="bg-white rounded-xl p-6 shadow-lg feature-card hover:shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 animate-pulse-gentle"
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
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center section-card animate-scaleIn">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Join Our Community & Build With Us! 🤝
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We believe in building Figs in public. Contribute to the
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
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center section-card animate-scaleIn">
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
                title="Figs Playlist"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Sneak Peek Section */}
      <section id="sneakpeek" ref={sneakPeekRef} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center section-card animate-scaleIn">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Sneak Peek: The Figs App ✨
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
              className="block bg-gray-100 rounded-2xl shadow-xl p-8 max-w-md mx-auto hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
            >
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-gentle"
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
                    Figs App
                  </h3>
                  <p style={{ color: "#6A0DAD" }}>Click to Preview!</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team 👨‍💼👩‍💼
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're a passionate team of finance enthusiasts and tech
              innovators, dedicated to empowering Gen Z with smart financial
              solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Deven */}
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center section-card animate-fadeInUp hover:shadow-xl transition-all duration-300">
              <div className="mb-6">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/deven.jpg"
                    alt="Deven"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Deven
              </h3>
              <p className="text-purple-600 font-semibold mb-4 text-sm sm:text-base">
                Co-founder & CEO
              </p>
              <div className="flex justify-center mt-4">
                <a
                  href="https://www.linkedin.com/in/deven-jain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.47 2H3.53a1.45 1.45 0 00-1.47 1.43v17.14A1.45 1.45 0 003.53 22h16.94a1.45 1.45 0 001.47-1.43V3.43A1.45 1.45 0 0020.47 2zM8.09 18.74h-3v-9h3v9zM6.59 8.48a1.56 1.56 0 111.56-1.56 1.57 1.57 0 01-1.56 1.56zm11.15 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0011.85 13a2 2 0 00-.1.73v5h-3s.04-8.18 0-9h3v1.28a3 3 0 012.71-1.5c2 0 3.44 1.29 3.44 4.08v5.18z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Edson */}
            <div
              className="bg-white rounded-2xl p-6 shadow-lg text-center section-card animate-fadeInUp hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="mb-6">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/edson.jpg"
                    alt="Edson"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Edson
              </h3>
              <p className="text-purple-600 font-semibold mb-4 text-sm sm:text-base">
                Co-founder & COO
              </p>
              <div className="flex justify-center mt-4">
                <a
                  href="https://www.linkedin.com/in/edson-rebello/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.47 2H3.53a1.45 1.45 0 00-1.47 1.43v17.14A1.45 1.45 0 003.53 22h16.94a1.45 1.45 0 001.47-1.43V3.43A1.45 1.45 0 0020.47 2zM8.09 18.74h-3v-9h3v9zM6.59 8.48a1.56 1.56 0 111.56-1.56 1.57 1.57 0 01-1.56 1.56zm11.15 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0011.85 13a2 2 0 00-.1.73v5h-3s.04-8.18 0-9h3v1.28a3 3 0 012.71-1.5c2 0 3.44 1.29 3.44 4.08v5.18z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Shadab */}
            <div
              className="bg-white rounded-2xl p-6 shadow-lg text-center section-card animate-fadeInUp hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="mb-6">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/shadab.jpg"
                    alt="Shadab"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Shadab
              </h3>
              <p className="text-purple-600 font-semibold mb-4 text-sm sm:text-base">
                Co-founder & CTO
              </p>
              <div className="flex justify-center mt-4">
                <a
                  href="https://in.linkedin.com/in/shadabkalim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.47 2H3.53a1.45 1.45 0 00-1.47 1.43v17.14A1.45 1.45 0 003.53 22h16.94a1.45 1.45 0 001.47-1.43V3.43A1.45 1.45 0 0020.47 2zM8.09 18.74h-3v-9h3v9zM6.59 8.48a1.56 1.56 0 111.56-1.56 1.57 1.57 0 01-1.56 1.56zm11.15 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0011.85 13a2 2 0 00-.1.73v5h-3s.04-8.18 0-9h3v1.28a3 3 0 012.71-1.5c2 0 3.44 1.29 3.44 4.08v5.18z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Harsh Madhav */}
            <div
              className="bg-white rounded-2xl p-6 shadow-lg text-center section-card animate-fadeInUp hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="mb-6">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  <svg
                    className="w-14 h-14 sm:w-16 sm:h-16 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Harsh Madhav
              </h3>
              <p className="text-purple-600 font-semibold mb-4 text-sm sm:text-base">
                Product Lead
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 animate-fadeInUp">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Figs</h3>
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
              © 2025 Figs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Navigation - Completely Redesigned */}
      {(showWhatsapp || showYoutube || showSneakPeek) && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="floating-nav rounded-2xl p-3 flex flex-col space-y-3">
            {showWhatsapp && (
              <button
                className="nav-button whatsapp-button w-12 h-12 rounded-xl flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  whatsappRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                <div className="nav-tooltip">Join Community</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M16.04 3.03A12.97 12.97 0 003.05 16a13 13 0 002.1 6.83l-2.3 7.93 8.12-2.33A13 13 0 1016.04 3.03zm0 23.43a10.46 10.46 0 01-5.31-1.45l-.38-.23-4.82 1.39 1.28-4.93-.25-.4a10.5 10.5 0 1110.48 5.62z" />
                  <path d="M23.26 18.62c-.38-.19-2.23-1.1-2.58-1.22-.35-.1-.61-.19-.88.19-.26.38-1.06 1.22-1.3 1.47-.24.26-.49.29-.9.1-.38-.19-1.6-.59-3.04-1.87-.56-.5-.94-1.12-1.05-1.5-.11-.38-.01-.59.17-.79.17-.17.38-.44.57-.66.19-.22.26-.38.38-.63.13-.25.06-.47-.03-.66-.1-.19-.88-2.13-1.21-2.93-.32-.78-.65-.67-.88-.68l-.75-.01c-.19 0-.5.07-.76.38s-1 1-1 2.36c0 1.36 1.02 2.68 1.16 2.87.13.19 2 3.05 4.84 4.28.68.29 1.21.46 1.62.59.68.23 1.3.2 1.79.12.55-.09 1.7-.69 1.94-1.36.24-.66.24-1.23.17-1.36-.06-.12-.26-.19-.55-.38z" />
                </svg>
              </button>
            )}
            {showYoutube && (
              <button
                className="nav-button youtube-button w-12 h-12 rounded-xl flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  youtubeRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                <div className="nav-tooltip">Watch Videos</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.8-1.6-.8-2-1C17.7 2.5 12 2.5 12 2.5h0s-5.7 0-8.7.4c-.4 0-1.3.2-2 1-.7.7-.8 2.3-.8 2.3S0 8 .2 9.8v1.4c-.2 1.8.4 3.6.4 3.6s.2 1.6.8 2.3c.8.8 1.8.8 2.2 1 1.6.1 6.7.4 7.5.4s5.7-.2 8.7-.5c.4 0 1.3-.2 2-1 .7-.7.8-2.3.8-2.3s.7-1.9.9-3.7v-1.4c-.3-1.8-.9-3.6-.9-3.6zM9.8 14.4V7.6l6.2 3.4-6.2 3.4z" />
                </svg>
              </button>
            )}
            {showSneakPeek && (
              <button
                className="nav-button preview-button w-12 h-12 rounded-xl flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  sneakPeekRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                <div className="nav-tooltip">App Preview</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <rect
                    x="4"
                    y="2"
                    width="16"
                    height="20"
                    rx="2"
                    ry="2"
                    strokeWidth="2"
                  />
                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
