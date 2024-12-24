import React from "react";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "Respecting Your Time",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et tempus erat, et luctus quam. Maecenas cursus porta tortor, vel consectetur ante volutpat...",
  },
  {
    question: "Latest In Technology",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et tempus erat, et luctus quam. Maecenas cursus porta tortor, vel consectetur ante volutpat...",
  },
  {
    question: "Professional Staff",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et tempus erat, et luctus quam. Maecenas cursus porta tortor, vel consectetur ante volutpat...",
  },
  {
    question: "Free Home Delivery",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et tempus erat, et luctus quam. Maecenas cursus porta tortor, vel consectetur ante volutpat...",
  },
  {
    question: "High Quality",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et tempus erat, et luctus quam. Maecenas cursus porta tortor, vel consectetur ante volutpat...",
  },
];

const Chooseus = () => {
  return (
    <div className="chooseus  relative  mt-12">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="container mx-auto py-8">
          {/* Section Title */}
          

          <h1 className="text-center text-4xl font-roboto-slab font-medium text-custom-gray mb-12">
            <span className="text-[#93C572]">Why</span>Choose Us
          </h1>

          {/* Accordion */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl">
              {faqData.map((item, index) => (
                <Disclosure key={index}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between items-center w-full px-6 py-4 text-left text-black bg-[#93C572] rounded-lg mb-2 focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                        <span className="font-roboto-slab font-medium text-lg">
                          {item.question}
                        </span>
                        <span>
                          {open ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-6 pt-2 pb-4 text-black bg-[#93C572] rounded-lg mb-2">
                        <p className="font-roboto text-base">
                          {item.answer}
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chooseus;
