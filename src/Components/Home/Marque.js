'use client';

import React from 'react';

const GridSection = () => {
  return (
    <>
      <style jsx>{`
        .card {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          width: 100%;
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease-in-out;
        }

        .card:hover img {
          transform: scale(1.05);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.05));
          z-index: 1;
        }

        .title {
          position: absolute;
          top: 10px;
          left: 10px;
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          z-index: 2;
        }

        .tall {
          height: 420px;
        }

        .half {
          height: 200px;
        }

        @media (max-width: 768px) {
          .tall {
            height: 250px;
          }

          .half {
            height: 150px;
          }

          .title {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="container py-4">
        <div className="row g-4">
          {/* Hoodies - left full height */}
          <div className="col-12 col-md-4">
            <div className="card tall">
              <img src="https://images.meesho.com/images/products/169216465/4kp15_512.webp" alt="Hoodies" />
              <div className="overlay"></div>
              <h3 className="title">Hoodies</h3>
            </div>
          </div>

          {/* Middle 2 rows: Damines + Girls/Shirts */}
          <div className="col-12 col-md-4 d-flex flex-column gap-4">
            {/* Damines */}
            <div className="card half">
              <img src="https://media.istockphoto.com/id/621499082/photo/man-standing-in-street-wearing-denim-portrait.jpg?s=612x612&w=0&k=20&c=4anD9Gp9ZxxMS4aaGbCQNsGRQ0GDtOdtFVI3aeD9RMY=" alt="Damines" />
              <div className="overlay"></div>
              <h3 className="title">Damines</h3>
            </div>

            <div className="row g-4">
              {/* Girls Wear */}
              <div className="col-6">
                <div className="card half">
                  <img src="https://c0.wallpaperflare.com/preview/879/951/829/attractive-beautiful-beauty-casual.jpg" alt="Girls Wear" />
                  <div className="overlay"></div>
                  <h3 className="title">Girls Wear</h3>
                </div>
              </div>

              {/* Shirts */}
              <div className="col-6">
                <div className="card half">
                  <img src="https://img-c.udemycdn.com/course/750x422/5444528_d4e3_5.jpg" alt="Shirts" />
                  <div className="overlay"></div>
                  <h3 className="title">Shirts</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Jackets - right full height */}
          <div className="col-12 col-md-4">
            <div className="card tall">
              <img src="https://thumbs.dreamstime.com/b/beautiful-fashion-woman-portrait-young-trendy-girl-stylish-sunglasses-ad-leather-jacket-posing-street-added-filter-117934355.jpg" alt="Jackets" />
              <div className="overlay"></div>
              <h3 className="title">Jackets</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GridSection;
