'use client';
import React from 'react';

const About = () => {
  return (
    <>
      <section className="container py-5">
        <div className="row align-items-center g-5">

          {/* Video Section */}
          <div className="col-lg-5 col-md-6 text-center">
            <div className="position-relative about-video-wrapper shadow rounded overflow-hidden">
              <video
                src="/assets/V1.mp4"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="about-video-overlay"></div>
              <span className="about-video-badge">Our Journey</span>
            </div>
          </div>

          {/* Text Section */}
          <div className="col-lg-7 col-md-6">
            {/* Section Tag */}
            <div className="d-flex align-items-center mb-3">
              <div className="about-line me-2"></div>
              <small className="text-uppercase text-muted fw-semibold">
                About Us
              </small>
            </div>

            {/* Heading */}
            <h2 className="fw-bold mb-3 lh-base">
              Your Trusted & Passionate Partner in{" "}
              <span className="gradient-text">E-Commerce Success</span>
            </h2>
            <p className="text-muted mb-4">
              At <strong>Agpdienen Private Limited</strong>, we’re more than just a service provider —
              we are your dedicated partner in building and scaling your e-commerce
              business. With a passion for innovation and a deep understanding of
              the digital marketplace, we deliver tailored solutions that drive
              growth, boost efficiency, and enhance customer experiences.
            </p>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3">
              <a href="#projects" className="btn glassy-btn px-4 py-2">
                See Projects
              </a>
              <a href="#details" className="btn glassy-btn btn-outline-dark px-4 py-2">
                More Details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        .about-line {
          width: 50px;
          height: 3px;
          background-color: #0d6efd;
        }
        .about-video-wrapper {
          height: 350px;
          border-radius: 12px;
        }
        .about-video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0.4)
          );
          pointer-events: none;
        }
        .about-video-badge {
          position: absolute;
          bottom: 15px;
          left: 15px;
          background: #0d6efd;
          color: #fff;
          padding: 6px 12px;
          font-size: 12px;
          border-radius: 20px;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .about-video-wrapper {
            height: 250px;
          }
        }
      `}</style>
    </>
  );
};

export default About;
