import React from "react";
import { FaFacebook, FaTwitter, FaGooglePlus, FaLinkedin } from "react-icons/fa";

// Import expert image
import expertImage from "../assets/experts/artist1.jpg"; // Update the path if needed
import { Link } from "react-router-dom";

const Ourexpert = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col">
      <div className="w-full py-8 px-4 md:px-8 lg:px-12">
        <div className="container">
          {/* Title Section */}
          <h1 className="text-center text-4xl font-roboto-slab font-medium text-custom-gray mb-12">
            <span className="text-[#93C572]">Our</span> Expert Artists
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="flex justify-center items-center">
              <div
                className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 hover:opacity-90"
                style={{ backgroundColor: "#93C572" }} // Theme color background for the image
              >
                <img
                  className="w-full h-full object-cover"
                  src={expertImage}
                  alt="Expert Artist"
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="flex flex-col justify-center">
              <h3 className="text-[28px] md:text-[35px] font-roboto-slab font-medium pb-[20px] md:pb-[35px] text-[#93C572]">
                Meet Melisa Bush
              </h3>
              <p className="text-base text-black leading-6 mb-4 md:mb-6">
                Melisa is an expert artist with years of experience in delivering high-quality artwork. She specializes in creating unique, hand-crafted designs that capture attention and resonate with viewers.
              </p>
              <p className="text-base text-black leading-6 mb-4 md:mb-6">
                With a passion for creativity and a focus on precision, Melisa brings a modern touch to traditional techniques. Her work has been showcased in various art exhibitions and admired by clients worldwide.
              </p>

              {/* Social Media Links */}
              <div className="flex space-x-4 mb-4">
                <a
                  href="#"
                  className="text-[#9FE2BF] hover:text-[#93C572] transition duration-300"
                  aria-label="Melisa Bush Facebook"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="#"
                  className="text-[#9FE2BF] hover:text-[#93C572] transition duration-300"
                  aria-label="Melisa Bush Twitter"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="#"
                  className="text-[#9FE2BF] hover:text-[#93C572] transition duration-300"
                  aria-label="Melisa Bush Google Plus"
                >
                  <FaGooglePlus size={24} />
                </a>
                <a
                  href="#"
                  className="text-[#9FE2BF] hover:text-[#93C572] transition duration-300"
                  aria-label="Melisa Bush LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>

              {/* Button */}
               <div className="flex justify-center lg:justify-start md:justify-start sm:justify-center w-full">
                <Link
                  to="#"
                  className="inline-block bg-[#9FE2BF] hover:bg-[#93C572] text-black text-center font-roboto font-medium text-lg py-3 px-3 rounded border border-[#9FE2BF] transition duration-300 max-w-[150px] mt-4"
                >
                  View More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ourexpert;
