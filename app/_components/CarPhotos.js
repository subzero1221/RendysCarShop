"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PhotosModal from "./PhotosModal";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function CarPhotos({ car }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : car.photos.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < car.photos.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const imageUrl = (photo) =>
    `https://drive.google.com/uc?export=view&id=${
      photo.split("/d/")[1].split("/")[0]
    }`;

  return (
    <div
      className={`relative w-full ${
        isFullscreen ? "h-screen" : "h-[600px]"
      } border border-gray-300 rounded-lg shadow-lg overflow-hidden`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex items-center justify-center h-full"
        >
          <Image
            src={imageUrl(car.photos[currentIndex])}
            alt={`Car photo ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="cursor-pointer"
            onClick={toggleModal}
          />
          {car.vip && (
            <span className="absolute z-10 px-3 py-1 text-sm font-bold text-black bg-yellow-400 rounded-full top-4 left-4">
              VIP
            </span>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute z-10 p-2 text-white transition-all duration-300 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full left-4 top-1/2 hover:bg-opacity-75"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute z-10 p-2 text-white transition-all duration-300 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full right-4 top-1/2 hover:bg-opacity-75"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Fullscreen Toggle */}
      <button
        onClick={toggleFullscreen}
        className="absolute z-10 p-2 text-white transition-all duration-300 bg-black bg-opacity-50 rounded-full top-4 right-4 hover:bg-opacity-75"
      >
        {isFullscreen ? <FiMinimize2 size={20} /> : <FiMaximize2 size={20} />}
      </button>

      {/* Image Counter */}
      <div className="absolute px-3 py-1 text-white bg-black bg-opacity-50 rounded-full bottom-4 left-4">
        {currentIndex + 1} / {car.photos.length}
      </div>

      {/* Thumbnails Section */}
      <div className="absolute bottom-0 left-0 right-0 flex p-2 space-x-2 overflow-x-auto bg-black bg-opacity-50">
        {car.photos.map((photo, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative flex-shrink-0 w-16 h-16 overflow-hidden rounded-md ${
              index === currentIndex ? "ring-2 ring-white" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={imageUrl(photo)}
              alt={`Thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Modal for Full-Screen View */}
      <PhotosModal isOpen={isModalOpen} onClose={toggleModal}>
        <div className="relative w-full h-[80vh]">
          <Image
            src={imageUrl(car.photos[currentIndex])}
            alt="Full View"
            layout="fill"
            objectFit="contain"
          />
          <button
            onClick={handlePrev}
            className="absolute z-10 p-2 text-white transition-all duration-300 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full left-4 top-1/2 hover:bg-opacity-75"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute z-10 p-2 text-white transition-all duration-300 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full right-4 top-1/2 hover:bg-opacity-75"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </PhotosModal>
    </div>
  );
}

export default CarPhotos;
