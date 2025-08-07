import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Img1 from '../../assets/images/H5.jpg';
import Img2 from '../../assets/images/H2.jpg';
import Img3 from '../../assets/images/H3.jpg';
import Img4 from '../../assets/images/H4.jpg';
import { motion,AnimatePresence  } from 'framer-motion';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const progressBarRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: Img1,
      title: "Bold Looks. Effortless Style.",
      topic: "Men's wear",
      description: "Discover our signature collection blending comfort and attitude.",
      author: "Timeless Streetwear"
    },
    {
      id: 2,
      image: Img2,
      title: "Minimal, Versatile, Made to Move.",
      topic: "Women's Wear",
      description: "From cozy basics to premium fits—outfits that go with everything.",
      author: "Everyday Essentials"
    },
    {
      id: 3,
      image: Img3,
      title: "Fresh Drops You’ll Live In.",
      topic: "Cloths",
      description: "Meet our newest arrivals—handpicked to upgrade your daily wardrobe.",
      author: "New Season. New Energy."
    },
    {
      id: 4,
      image: Img4,
      title: "Performance Meets Fashion.",
      topic: "Cloths",
      description: "Activewear that transitions from workouts to weekends.",
      author: "Made for Movement"
    }
  ];

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

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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

  const displayThumbnails = [
    slides[currentSlide],
    ...slides.filter((_, idx) => idx !== currentSlide)
  ];

  return (
    <div className="position-relative overflow-hidden" style={{ height: '100vh', backgroundColor: '#000' }}>
      {/* Progress bar */}
      <div
        ref={progressBarRef}
        className="position-absolute top-0 start-0 bg-danger"
        style={{ height: '3px', width: '0%', zIndex: 1000 }}
      ></div>

      {/* Carousel */}
      <div className="carousel-inner h-100">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item h-100 position-relative ${index === currentSlide ? 'active' : ''}`}
            style={{ display: index === currentSlide ? 'block' : 'none' }}
          >
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ position: 'relative' }}>
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                priority={index === 0}
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div className="position-absolute top-0 start-0 w-100 h-100  opacity-50"></div>

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
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-1 fw-bold text-uppercase"
      style={{
        letterSpacing: '10px',
        textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
      }}
    >
      {slide.author}
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="display-2 fw-bold mb-3"
      style={{ textShadow: '2px 2px 5px rgba(0,0,0,0.5)' }}
    >
      {slide.title}
    </motion.h1>

    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-danger fw-bold display-4 mb-4"
    >
      {slide.topic}
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="mb-4 fs-5"
    >
      {slide.description}
    </motion.p>
  </motion.div>
</AnimatePresence>

            </div>
          </div>
        ))}
      </div>

      {/* Thumbnail cards (bottom-right) */}
      <div
        className="position-absolute d-flex gap-3"
        style={{
          bottom: '30px',
          right: '30px',
          zIndex: 100,
        }}
      >
        {displayThumbnails.slice(0, 3).map((slide, index) => {
          const isActive = slide.id === slides[currentSlide].id;
          return (
            <div
              key={`thumb-${slide.id}`}
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
              onClick={() => goToSlide(slides.findIndex(s => s.id === slide.id))}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src={slide.image}
                  alt={`Thumb ${index}`}
                  fill
                  style={{
                    objectFit: 'cover',
                    borderRadius: '20px',
                  }}
                />
                <div
                  className="position-absolute bottom-0 start-0 p-2 w-100"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#fff',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
                    fontSize: '12px',
                  }}
                >
                  <div className="fw-bold text-truncate">Name Slider</div>
                  <div className="text-truncate">Description</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows (optional) */}
     
    </div>
  );
};

export default Hero;
