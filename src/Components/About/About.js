// // pages/about.js

// import Image from "next/image";
// import img from '../../assets/pinkcityimg/productsmarque/about.jpg'
// import img1 from '../../assets/pinkcityimg/productsmarque/about1.png'

// export default function About() {
//   return (
//     <>
//       <div className="container py-5">
//         <div className="row align-items-center">
//           {/* Left Column (Image) */}
//           <div className="col-md-6">
//             <div className="image-container mb-4 mb-md-0 image-wrappe">
//               <Image
//                 src={img}
//                 alt="About Us"
//                 className="img-fluid rounded shadow-lg zoom-effect"
//               />
//             </div>
//           </div>

//           {/* Right Column (Content) */}
//           <div className="col-md-6">
//             <h1 className="text-dark mb-3">About Agpdienen Private Limited</h1>
//             <p className="text-muted">
//               At Agpdienen Private Limited, we take pride in being your go-to destination for stylish and comfortable family wear clothing. From trendy outfits for kids to elegant styles for adults, we cater to the fashion needs of every family member, making us your one-stop shop for all things clothing.
//             </p>
//           </div>
//         </div>

//         <div className="bg-gray-50 py-8 px-6 sm:px-10 md:px-20">
//           <header className="text-center mb-12">
//             <h1 className="text-4xl font-semibold text-dark">Bringing Families Together Through Fashion</h1>
//           </header>
//           <div className="row align-items-center">
//           <div className="col-md-6">
//             <div className="image-container mb-4 mb-md-0 image-wrappe">
//               <Image
//                 src={img1}
//                 alt="About Us"
//                 className="img-fluid rounded zoom-effect"
//               />
//             </div>
//           </div>
//           <div className="col-md-6">
//           <section className="mb-12">
//             <h2 className="text-3xl font-semibold text-dark mb-4">Our Focus</h2>
//             <p className="text-lg text-gray-700 leading-relaxed">
//               Agpdienen Private Limited is dedicated to providing high-quality, stylish, and affordable clothing for families. Whether it`s casual wear, festive attire, or everyday essentials, we have something special for everyone.
//             </p>
//           </section>

//           <section className="mb-12">
//             <h2 className="text-3xl font-semibold text-dark mb-4">Why Families Choose Us?</h2>
//             <ul className="space-y-4 text-lg text-gray-700">
//               <li className="flex items-center">
//                 <span className="mr-2 text-blue-600">✔</span> <strong>Wide Range of Options:</strong> From toddlers to adults, we cover all age groups.
//               </li>
//               <li className="flex items-center">
//                 <span className="mr-2 text-blue-600">✔</span> <strong>Premium Quality:</strong> Durable fabrics and impeccable craftsmanship.
//               </li>
//               <li className="flex items-center">
//                 <span className="mr-2 text-blue-600">✔</span> <strong>Affordable Pricing:</strong> Stylish clothing without breaking the bank.
//               </li>
//               <li className="flex items-center">
//                 <span className="mr-2 text-blue-600">✔</span> <strong>Customer-Centric Approach:</strong> Exceptional support and easy returns.
//               </li>
//             </ul>
//           </section>
// </div>
// </div>
//           <section className="mb-12">
//             <h2 className="text-3xl font-semibold text-dark mb-4">Our Journey</h2>
//             <p className="text-lg text-gray-700 leading-relaxed">
//               Agpdienen Private Limited started with a dream of making quality family wear accessible to everyone. Over the years, we have become a trusted name for families looking for trendy and comfortable clothing options.
//             </p>
//           </section>

//           <section>
//             <h2 className="text-3xl font-semibold text-dark mb-4">Our Commitment</h2>
//             <p className="text-lg text-gray-700 leading-relaxed">
//               We are committed to offering an unmatched shopping experience, ensuring that every family finds the perfect attire for every occasion. At Agpdienen, we celebrate the joy of family through fashion.
//             </p>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// }





'use client';
import React from 'react';
// import Vid1 from '../../assets/images/V1.mp4';
// import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <>
      <section className="container py-5 position-relative">
        <div className="row align-items-center">
          {/* Video Section */}
          <div className="col-md-5 mb-4 mb-md-0 d-flex justify-content-center">
            <video
              src="/assets/V1.mp4"
              className="rounded shadow w-100"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* Text Section */}
          <div className="col-md-7 text-center text-md-start position-relative">
            {/* Vertical "ABOUT US" Label */}
            <div className="d-none d-md-block position-absolute about-vertical-text">
              <div className="d-flex align-items-center gap-2 text-secondary">
                <div className="about-line"></div>
                <small className="text-dark">ABOUT US</small>
              </div>
            </div>

            <h2 className="fw-bold mb-3">
              Your trusted and <br /> passionate partner in e-commerce success. <br />
              <span className="fs-6 fw-light">(Agpdienen Private Limited)</span>
            </h2>

            <p className="text-muted">
              At Agpdienen Private Limited, we are more than just a service provider — we are your dedicated partner in building and scaling your e-commerce business. With a passion for innovation and a deep understanding of the digital marketplace, we deliver tailored solutions that drive growth, boost efficiency, and enhance customer experiences.
            </p>

            {/* Optional Buttons */}
            {/* 
            <div className="d-flex flex-column flex-sm-row gap-3 mt-4 justify-content-center justify-content-md-start">
              <a href="#" className="btn btn-primary">See Projects</a>
              <a href="#" className="btn btn-outline-dark">More Details</a>
            </div> 
            */}
          </div>
        </div>
      </section>

      {/* Embedded CSS */}
      <style jsx>{`
        .about-vertical-text {
          left: -60px;
          top: 50%;
          transform: rotate(-90deg) translateY(-50%);
        }

        .about-line {
          width: 60px;
          height: 2px;
          background-color: black;
        }

        @media (max-width: 768px) {
          .about-vertical-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default About;
