import React from "react";
import { SectionTitle } from "../components";

const Gallery = () => {
  return (
    <div className="bg-gray-100">
      {/* Section Title */}
      <SectionTitle title="Gallery" path="Home > Gallery" />
      <div className="max-w-7xl flex flex-col mx-auto">
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-5">
            {/* First Column */}
            <div className="grid gap-4">
              <div className="bg-[#93C572] overflow-hidden rounded-lg p-2">
                <img
                  className="h-auto max-w-full rounded-lg border transform transition-transform duration-500 ease-in-out hover:scale-110"
                  src="../assets/gallery/B-01.webp"
                  alt="Gallery Item"
                />
              </div>
              <div className="bg-[#AFE1AF] overflow-hidden rounded-lg p-2">
                <img
                  className="h-auto max-w-full rounded-lg border transform transition-transform duration-500 ease-in-out hover:scale-110"
                  src="../assets/gallery/B-02.webp"
                  alt="Gallery Item"
                />
              </div>
              <div className="bg-[#9FE2BF] overflow-hidden rounded-lg p-2">
                <img
                  className="h-auto max-w-full rounded-lg border transform transition-transform duration-500 ease-in-out hover:scale-110"
                  src="../assets/gallery/B-03.webp"
                  alt="Gallery Item"
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="grid gap-4">
              <div className="bg-[#93C572] overflow-hidden rounded-lg p-2">
                <img
                  className="h-auto max-w-full rounded-lg border transform transition-transform duration-500 ease-in-out hover:scale-110"
                  src="../assets/gallery/B-04.webp"
                  alt="Gallery Item"
                />
              </div>
              <div className="bg-[#AFE1AF] overflow-hidden rounded-lg p-2">
                <img
                  className="h-auto max-w-full rounded-lg border transform transition-transform duration-500 ease-in-out hover:scale-110"
                  src="../assets/gallery/B-05.webp"
                  alt="Gallery Item"
                />
              </div>
              <div className="bg-[#9FE2BF] overflow-hidden rounded-lg p-2">
                <img
                  className="h-auto max-w-full rounded-lg border transform transition-transform duration-500 ease-in-out hover:scale-110"
                  src="../assets/gallery/B-06.webp"
                  alt="Gallery Item"
                />
              </div>
            </div>

            {/* Third Column */}
            <div className="grid gap-4">
              <div className="bg-[#93C572] overflow-hidden rounded-lg p-2">
                <img
                  className="h-auto max-w-full rounded-lg border transform transition-transform duration-500 ease-in-out hover:scale-110"
                  src="../assets/gallery/C-07.webp"
                  alt="Gallery Item"
                />
              </div>
              <div className="bg-[#AFE1AF] overflow-hidden rounded-lg p-2">
                <img
                  className="h-auto max-w-full rounded-lg border transform transition-transform duration-500 ease-in-out hover:scale-110"
                  src="../assets/gallery/CH-08.webp"
                  alt="Gallery Item"
                />
              </div>
              <div className="bg-[#9FE2BF] overflow-hidden rounded-lg p-2">
                <img
                  className="h-auto max-w-full rounded-lg border transform transition-transform duration-500 ease-in-out hover:scale-110"
                  src="../assets/gallery/D-09.webp"
                  alt="Gallery Item"
                />
              </div>
            </div>

            {/* Fourth Column */}
            <div className="grid gap-4">
              <div className="bg-[#93C572] overflow-hidden rounded-lg p-2">
                <img
                  className="h-auto max-w-full rounded-lg border transform transition-transform duration-500 ease-in-out hover:scale-110"
                  src="../assets/gallery/D-010.webp"
                  alt="Gallery Item"
                />
              </div>
              <div className="bg-[#AFE1AF] overflow-hidden rounded-lg p-2">
                <img
                  className="h-auto max-w-full rounded-lg border transform transition-transform duration-500 ease-in-out hover:scale-110"
                  src="../assets/gallery/EF-011.webp"
                  alt="Gallery Item"
                />
              </div>
              <div className="bg-[#9FE2BF] overflow-hidden rounded-lg p-2">
                <img
                  className="h-auto max-w-full rounded-lg border transform transition-transform duration-500 ease-in-out hover:scale-110"
                  src="../assets/gallery/F-012.webp"
                  alt="Gallery Item"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

