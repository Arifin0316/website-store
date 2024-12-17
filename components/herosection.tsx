'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SliderProps {
  images: string[];
  height?: string;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showDots?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  className?: string;
}

const ImageSlider: React.FC<SliderProps> = ({ images, height = 'h-[60vh]', autoPlayInterval = 5000, showNavigation = true, showDots = true, objectFit = 'cover', className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(slideInterval);
  }, [images, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={`relative w-full rounded-2xl h-[180px] md:h-full group ${height} overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className={`w-full ${height} flex-shrink-0 relative`}>
            <Image src={image} alt={`Slide ${index + 1}`} fill priority={index === 0} quality={90} className={`object-${objectFit}`} />
          </div>
        ))}
      </div>

      {/* Tombol Navigasi */}
      {showNavigation && (
        <div className=' opacity-10 group-hover:opacity-100 transition-opacity'>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10">
            &#10094;
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10">
            &#10095;
          </button>
        </div>
      )}

      {/* Indikator Dot */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-white/50'}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
