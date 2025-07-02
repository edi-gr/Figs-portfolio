"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Script from "next/script";

export default function Home() {
  // Section refs and visibility state
  const whatsappRef = useRef<HTMLElement>(null);
  const youtubeRef = useRef<HTMLElement>(null);
  const sneakPeekRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [showWhatsapp, setShowWhatsapp] = useState(true);
  const [showYoutube, setShowYoutube] = useState(true);
  const [showSneakPeek, setShowSneakPeek] = useState(true);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Form modal state
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    contact: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Always set countdown to 0
    setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
  }, []);

  // Auto-scroll to form section after 3 seconds
  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 3000);

    return () => clearTimeout(scrollTimer);
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

  // Form validation function
  const validateForm = () => {
    const errors = { name: "", contact: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      errors.contact = "Please provide either email or phone number";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Form submission function
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the Google Form submission URL
      const baseUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLSfL4uoviXtT3iZueeeOwAKoUJVb8SLpFf5d_dpPR-sAY_zfJQ/formResponse";

      const formDataToSend = new URLSearchParams();
      formDataToSend.append("entry.326049074", formData.name);
      if (formData.email) {
        formDataToSend.append("entry.1719872335", formData.email);
      }
      if (formData.phone) {
        formDataToSend.append("entry.572226123", formData.phone);
      }

      // Submit to Google Forms (using fetch with no-cors mode)
      await fetch(baseUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataToSend.toString(),
      });

      // Close modal and redirect to download
      setShowFormModal(false);
      setFormData({ name: "", email: "", phone: "" });

      // Redirect to download link
      window.open(
        "https://drive.google.com/drive/folders/1jrDKqRwVfDUUYz4KIE__rJlv2VHM1t8p",
        "_blank"
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      // Still redirect to download even if form submission fails
      window.open(
        "https://drive.google.com/drive/folders/1jrDKqRwVfDUUYz4KIE__rJlv2VHM1t8p",
        "_blank"
      );
      setShowFormModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (formErrors.name && name === "name") {
      setFormErrors((prev) => ({ ...prev, name: "" }));
    }
    if (formErrors.contact && (name === "email" || name === "phone")) {
      setFormErrors((prev) => ({ ...prev, contact: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Confetti Script */}
      <Script
        src="https://run.confettipage.com/here.js"
        data-confetticode="U2FsdGVkX18GYT0Pz+uCv/2DjcZv0mFb1qsE1yuDXVpyixNFBRnUh6FsyOH2v1I6+4P8eOZYT0mksaGZI1Kav9Ykz8uP4zkMXlzuLwGFMqMjgEH+I+RNE6H0+rRkQ9mG5cPPxrgfavKkEUlN9G8cEGkehF/3TiEvL/NLfVdVIcg7p+GXOInU1pkTPAP+Fl9sRBjvs4QyS/HReDOuDJ1Go6/sHk/1L9yxY7bOlGge7RVGrBl6knlqKi+vriRo7cvjt/g7yrVOYpUkfXfvS2gLSPxufwuw7jQYCH0DAf6YgkT3+qOXTmtbLoAx7kRaUTDxZKAeYDVuiBPbc5OaIQa3x3jlH8xmzALxPKglOedvd0uIMq0B4T53u0J3TPOghu6RKKqt+0imqIp6Oe0oS/8ove5iJYFSSQoKRFkT4UO3co/9+H5T1UOgeeJWOArTMGpyTC7iTtPXj+uAdrnsWMeXYcfqospubTLC7TBou/0FP4Co2Ra9LbkCP6Y9AeX5FpWcytN+rKlNAHwlctVga3EzwnWDJzSEJEEVlDiz8sHBNCdQ4Cdm39AlT4BWUt3iCgqIpdSzsNPJyVeH3U6lXKxwmewWRtcd/SxVWm/ud96Vn7Nk9DGg4aGsGtdI7efkSTot3yv+gECtg/Ze/dCLGunCknWRW707H+XGuqvtgYIffiqZiT7khD6wMVf3c+DFFD7nlf98KmNdHbTg4obSswuYDB5kVm7h1D7ZCmldidIIfCs="
        strategy="afterInteractive"
      />

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

        .celebrate-text {
          background: linear-gradient(
            45deg,
            #ff6b6b,
            #4ecdc4,
            #45b7d1,
            #96ceb4
          );
          background-size: 400% 400%;
          animation: gradient-celebration 2s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes gradient-celebration {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .modal-enter {
          animation: modalEnter 0.3s ease-out forwards;
        }

        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .form-input:focus {
          box-shadow: 0 0 0 3px rgba(106, 13, 173, 0.1);
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
              🎉 <span className="celebrate-text">The App is Live!</span> 🎉
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
            <p className="text-lg font-semibold text-purple-600 mt-4">
              🚀 Ready to transform your financial future? Download now! 🚀
            </p>
          </div>

          {/* App Download Section */}
          <div
            ref={formRef}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg section-card animate-scaleIn"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                📱 Get the Figs App
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Download the app and watch our installation guide to get started
                on your financial journey!
              </p>
            </div>

            <div className="space-y-8">
              {/* Download Button */}
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4"></h4>
                <div className="space-y-4">
                  <button
                    onClick={() => setShowFormModal(true)}
                    className="custom-purple-button inline-flex items-center justify-center text-white font-semibold py-4 px-8 rounded-full shadow-lg w-full sm:w-auto"
                  >
                    <span className="text-2xl mr-3">⬇️</span>
                    Download on Android/iOS
                  </button>
                  <p className="text-sm text-gray-600">
                    Get the APK file and start your financial journey today!
                  </p>
                </div>
              </div>

              {/* Installation Guide Video */}
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  📺 Installation Guide
                </h4>
                <div className="relative max-w-2xl mx-auto">
                  <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/WvKBE9BDlGY"
                    title="Figs App Installation Guide"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  ></iframe>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Watch this quick guide to install the Figs app
                </p>
              </div>
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

            {/* Instagram Handle */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                📸 Follow Us on Instagram
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Stay updated with our latest content, behind-the-scenes moments,
                and financial tips on Instagram!
              </p>
              <a
                href="https://www.instagram.com/figsapp.in?igsh=MTRod3BrYTl2dzBodg=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @figsapp.in
              </a>
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

          {/* Top Row - Co-founders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
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
                Co-founder, CEO
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
                Co-founder, COO
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
                Co-founder, CTO
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
          </div>

          {/* Bottom Row - Team Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-2xl mx-auto">
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

            {/* Poddutur Pavan Gupta */}
            <div
              className="bg-white rounded-2xl p-6 shadow-lg text-center section-card animate-fadeInUp hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="mb-6">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/poddutur pavan gupta.jpg"
                    alt="Poddutur Pavan Gupta"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Poddutur Pavan Gupta
              </h3>
              <p className="text-purple-600 font-semibold mb-4 text-sm sm:text-base">
                Content Strategist
              </p>
              <div className="flex justify-center mt-4">
                <a
                  href="https://www.linkedin.com/in/poddutur-pavan-gupta-b7b6102a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
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

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl modal-enter">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                ⬇️ Download Figs App
              </h3>
              <p className="text-gray-600">
                Please provide your details to get the download link
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 ${
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Contact Method Error */}
              {formErrors.contact && (
                <p className="text-red-500 text-sm">{formErrors.contact}</p>
              )}

              {/* Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowFormModal(false);
                    setFormData({ name: "", email: "", phone: "" });
                    setFormErrors({ name: "", contact: "" });
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    "Get Download Link"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
