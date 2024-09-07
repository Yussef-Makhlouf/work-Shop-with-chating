import React from "react";
import { useNavigate } from "react-router-dom";
import "./heroSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import ProductCarousel from "./ProductSection";
import Navbar from "./Navbar";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleChatSelect = () => {
    navigate('/chat'); // Navigate to ChatPage
  };

  return (
    <div className="min-h-screen text-white font-serif">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="flex justify-center items-center h-80 bg-black relative text-center text-white overflow-hidden hero_section">
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10">
          <h1 className="text-5xl font-semibold">Work-Shop Profile</h1>
          <p className="text-gray-400 mt-4 hover:text-white">Home /Work-Shop</p>
        </div>
      </div>

      {/* Work-Shop Details */}
      <section className="py-16 px-8 md:px-16 lg:px-32">
        <div className="flex justify-center items-start space-x-8">
          {/* Left Section */}
          <div className="w-1/2 pr-8">
            <h2 className="text-3xl font-semibold mb-4">Workshop Name</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Location: 123 Main St, New York, NY
            </p>
            <p className="text-gray-400 mb-4">
              Our workshop provides top-notch services for home décor. Whether you're looking for custom furniture or interior design solutions, we are here to help. With over 10 years of experience, we have helped thousands of customers create their dream homes.
            </p>
          </div>

          {/* Vertical Line */}
          <div className="border-l border-gray-600 h-auto"></div>

          {/* Right Section */}
          <div className="w-1/2 pl-8">
            <h2 className="text-3xl font-semibold mb-4">Message Title</h2>
            <p className="text-gray-400 mb-6">
              Share your thoughts or reach out to us for more information!
            </p>

            {/* Rating */}
            <div className="mb-6">
              <p className="text-gray-300 mb-2">Rating:</p>
              <div className="flex space-x-2">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-400" />
              </div>
            </div>

            {/* Button */}
            <button
              className="bg-orange-500 hover:orange-600 text-white py-2 px-4 rounded w-full mt-4"
              onClick={handleChatSelect}
            >
              Chat
            </button>
          </div>
        </div>
      </section>

      <ProductCarousel />
    </div>
  );
};

export default HeroSection;
