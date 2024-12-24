import React from "react";
import Slider from "react-slick";
import { FaFacebook, FaTwitter, FaGooglePlus, FaLinkedin } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import customer images
import customer1 from "../assets/gallery/customer1.png"; // Make sure the path is correct
import customer2 from "../assets/gallery/customer2.png";
import customer3 from "../assets/gallery/customer3.png";

const testimonialsData = [
  {
    id: 1,
    name: "Hilpton Broad",
    position: "MDH",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years...",
    image: customer1,
    social: {
      facebook: "#",
      twitter: "#",
      googlePlus: "#",
      linkedin: "#",
    },
  },
  {
    id: 2,
    name: "Hilpton Broad",
    position: "MDH",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years...",
    image: customer2,
    social: {
      facebook: "#",
      twitter: "#",
      googlePlus: "#",
      linkedin: "#",
    },
  },
  {
    id: 3,
    name: "Hilpton Broad",
    position: "MDH",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years...",
    image: customer3,
    social: {
      facebook: "#",
      twitter: "#",
      googlePlus: "#",
      linkedin: "#",
    },
  },
];

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} text-fbae44 hover:text-fbae40`}
      style={{ ...style, display: "block", left: "25px", zIndex: 1 }}
      onClick={onClick}
      aria-label="Previous Slide"
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} text-fbae44 hover:text-fbae40`}
      style={{ ...style, display: "block", right: "25px", zIndex: 1 }}
      onClick={onClick}
      aria-label="Next Slide"
    />
  );
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Default number of slides
  slidesToScroll: 1,
  arrows: true,
  autoplay: true, // Enable autoplay
  autoplaySpeed: 3000, // Autoplay speed in milliseconds
  nextArrow: <NextArrow />, // Custom Arrow Component
  prevArrow: <PrevArrow />, // Custom Arrow Component
  responsive: [
    {
      breakpoint: 1024, // For screens smaller than 1024px
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768, // For screens smaller than 768px
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Testimonial = () => {
  return (
    <div className="testimonial py-8">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="container mx-auto my-12">
          

           {/* Title Section */}
           <h1 className="text-center text-4xl font-roboto-slab font-medium text-custom-gray mb-12">
            <span className="text-[#93C572]">Our</span>Happy Customers
          </h1>

          {/* Carousel */}
          <Slider {...sliderSettings} className="z-10 relative">
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className="px-4">
                <div className="flex flex-col items-center bg-[#AFE1AF] p-6 rounded-lg shadow-lg">
                  {/* Customer Image */}
                  <div className="relative w-32 h-32 mb-4">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}`}
                      className="rounded-full w-full h-full object-cover shadow-md"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-white opacity-0 transform scale-90 transition-all duration-500 ease-out hover:scale-105 hover:opacity-100">
                      {/* Sonar Effect */}
                    </div>
                  </div>

                  {/* Customer Name */}
                  <h3 className="text-2xl font-roboto-slab font-medium text-[#10170c] mb-1">
                    {testimonial.name}
                  </h3>

                  {/* Customer Position */}
                  <span className="text-md font-roboto text-[#9FE2BF] mb-4">
                    {testimonial.position}
                  </span>

                  {/* Customer Feedback */}
                  <p className="text-center text-base font-roboto text-black mb-6">
                    {testimonial.description}
                  </p>

                  {/* Social Icons */}
                  <ul className="flex space-x-4 mt-4">
                    {testimonial.social.facebook && (
                      <li>
                        <a
                          href={testimonial.social.facebook}
                          className="text-white hover:text-[#93C572] transition duration-300"
                          aria-label={`${testimonial.name} Facebook`}
                        >
                          <FaFacebook size={24} />
                        </a>
                      </li>
                    )}
                    {testimonial.social.twitter && (
                      <li>
                        <a
                          href={testimonial.social.twitter}
                          className="text-white hover:text-[#93C572] transition duration-300"
                          aria-label={`${testimonial.name} Twitter`}
                        >
                          <FaTwitter size={24} />
                        </a>
                      </li>
                    )}
                    {testimonial.social.googlePlus && (
                      <li>
                        <a
                          href={testimonial.social.googlePlus}
                          className="text-white hover:text-[#93C572] transition duration-300"
                          aria-label={`${testimonial.name} Google Plus`}
                        >
                          <FaGooglePlus size={24} />
                        </a>
                      </li>
                    )}
                    {testimonial.social.linkedin && (
                      <li>
                        <a
                          href={testimonial.social.linkedin}
                          className="text-white hover:text-[#93C572] transition duration-300"
                          aria-label={`${testimonial.name} LinkedIn`}
                        >
                          <FaLinkedin size={24} />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
