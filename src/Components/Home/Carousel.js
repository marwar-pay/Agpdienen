import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { apiGet } from '@/api/apiMethods';
// adjust path if needed

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const progressBarRef = useRef(null);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await apiGet('api/banner/home');
        // Handle API response shape
        const bannerData = Array.isArray(res.data) ? res.data : Array.isArray(res) ? res : [];
        setSlides(bannerData);
      } catch (err) {
        console.error('Error fetching banners:', err);
        setSlides([]);
      }
    };
    fetchBanners();
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetAutoPlay();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 100);
  };

  // Auto-play
  useEffect(() => {
    let interval;
    if (isAutoPlaying && slides.length > 0) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides]);

  // Progress bar animation
  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = '0%';
      setTimeout(() => {
        if (progressBarRef.current) {
          progressBarRef.current.style.width = '100%';
          progressBarRef.current.style.transition = 'width 5s linear';
        }
      }, 50);
    }
  }, [currentSlide]);

  const displayThumbnails = slides.length
    ? [slides[currentSlide], ...slides.filter((_, idx) => idx !== currentSlide)]
    : [];

  return (
    <div className="position-relative overflow-hidden" style={{ height: '100vh' }}>
      {/* Progress bar */}
      <div
        ref={progressBarRef}
        className="position-absolute top-0 start-0 "
        style={{ height: '3px', width: '0%', zIndex: 1000 }}
      ></div>

      {/* Carousel */}
      <div className="carousel-inner h-100">
        {slides.length > 0 &&
          slides.map((slide, index) => (
            <div
              key={slide._id}
              className={`carousel-item h-100 position-relative ${index === currentSlide ? 'active' : ''}`}
              style={{ display: index === currentSlide ? 'block' : 'none' }}
            >
              {/* Background image */}
              <div className="position-absolute top-0 start-0 w-100 h-100" style={{ position: 'relative' }}>
                <Image
                  src={slide.imageUrl}
                  alt={`Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Dark overlay */}
              <div className="position-absolute top-0 start-0 w-100 h-100 opacity-50"></div>

              {/* Text content */}
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                style={{ paddingLeft: '10%' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8 }}
                    className="text-white"
                    style={{ maxWidth: '600px' }}
                  >
                    {/* Render altText HTML from API */}
                    <div dangerouslySetInnerHTML={{ __html: slide.altText }} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ))}
      </div>

      {/* Thumbnail cards */}
      <div
        className="position-absolute d-flex gap-3"
        style={{
          bottom: '30px',
          right: '30px',
          zIndex: 100,
        }}
      >
        {displayThumbnails.map((slide) => {
          const isActive = slide._id === slides[currentSlide]._id;
          return (
            <div
              key={`thumb-${slide._id}`}
              className="rounded overflow-hidden shadow"
              style={{
                width: '120px',
                height: '160px',
                cursor: 'pointer',
                borderRadius: '20px',
                border: isActive ? '3px solid #f1683a' : '1px solid rgba(255,255,255,0.2)',
                position: 'relative',
                transition: 'all 0.4s ease',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}
              onClick={() => goToSlide(slides.findIndex((s) => s._id === slide._id))}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src={slide.imageUrl}
                  alt={`Thumb`}
                  fill
                  style={{
                    objectFit: 'cover',
                    borderRadius: '20px',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
