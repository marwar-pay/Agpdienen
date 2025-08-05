'use client';

import React from 'react';

const imageUrls = [
  "https://m.media-amazon.com/images/I/61PgbwTHmRL._AC_UY1100_.jpg",
  "https://urbantheka.in/cdn/shop/products/coupleaf_2184dc5c-5639-4940-b550-70791f89c110.jpg?v=1704188928",
  "https://images.meesho.com/images/products/462613126/83bu1_512.webp",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4var9vySpAMaBr7cyq6Cz8Brw-8pf-lCNCw&s",
  "https://m.media-amazon.com/images/I/51zVCML27yL._AC_UY1100_.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58Nq2wlgGiJ1PBZhSJZ6_fKCg3m-Q8QZFQMa2DgoEsHbiP2_xtOSBP3aP3JgyZxjgicY&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt956l9Psm8daq8-fU5b5ugU9EuDWsi-HsWg&s",
];

const AboutDetails = () => {
  return (
    <div className="bg-white py-5">
      <div className="container">
        <div className="row align-items-start">
          {/* Left Text Column */}
          <div className="col-lg-6 mb-4">
            <h1 className="display-5 fw-light mb-4">
              Bringing Families <br /> Together Through Fashion
            </h1>

            <h2 className="h3 fw-bold mb-2">Our Focus</h2>
            <p className="mb-4 text-secondary">
              Agpdienen Private Limited is dedicated to providing high-quality, stylish, and affordable clothing for families.
              Whether it’s casual wear, festive attire, or everyday essentials, we have something special for everyone.
            </p>

            <h2 className="h3 fw-bold mb-2">Our Journey</h2>
            <p className="mb-4 text-secondary">
              Agpdienen Private Limited started with a dream of making quality family wear accessible to everyone.
              Over the years, we have become a trusted name for families looking for trendy and comfortable clothing options.
            </p>

            <h2 className="h3 fw-bold mb-2">Our Commitment</h2>
            <p className="text-secondary">
              We are committed to offering an unmatched shopping experience, ensuring that every family finds the perfect attire
              for every occasion. At Agpdienen, we celebrate the joy of family through fashion.
            </p>
          </div>

          {/* Right Image Grid Column */}
          <div className="col-lg-6 d-flex flex-wrap gap-3 justify-content-center">
            {imageUrls.map((src, index) => (
              <div key={index} className="rounded overflow-hidden" style={{ width: '140px', height: '180px' }}>
                <img
                  src={src}
                  alt={`img-${index}`}
                  className="img-fluid w-100 h-100 object-fit-cover rounded shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDetails;
