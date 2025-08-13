'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Tag, Layers, Headphones, HeartHandshake } from 'lucide-react';

const imageUrls = [
  "https://m.media-amazon.com/images/I/61PgbwTHmRL._AC_UY1100_.jpg",
  "https://urbantheka.in/cdn/shop/products/coupleaf_2184dc5c-5639-4940-b550-70791f89c110.jpg?v=1704188928",
  "https://images.meesho.com/images/products/462613126/83bu1_512.webp",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4var9vySpAMaBr7cyq6Cz8Brw-8pf-lCNCw&s",
  "https://m.media-amazon.com/images/I/51zVCML27yL._AC_UY1100_.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58Nq2wlgGiJ1PBZhSJZ6_fKCg3m-Q8QZFQMa2DgoEsHbiP2_xtOSBP3aP3JgyZxjgicY&usqp=CAU",
  // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt956l9Psm8daq8-fU5b5ugU9EuDWsi-HsWg&s",
];

const AboutDetails = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }
    }),
  };

  return (
    <section className="bg-light py-5">
      <div className="container">
        <motion.h1
          className="display-5 fw-bold text-center mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Bringing Families Together Through Fashion
        </motion.h1>

        <div className="row g-4">
          {/* Left Side Cards */}
          <div className="col-lg-6">
            {[
              {
                icon: <ShieldCheck className="text-primary" size={28} />,
                title: "Quality You Can Trust",
                text: "Every piece is crafted with care, ensuring comfort and durability."
              },
              {
                icon: <Tag className="text-success" size={28} />,
                title: "Affordable Style",
                text: "Trendy designs at prices that fit every family’s budget."
              },
              {
                icon: <Layers className="text-warning" size={28} />,
                title: "Wide Variety",
                text: "From festive outfits to everyday wear — something for all ages."
              },
              {
                icon: <Headphones className="text-danger" size={28} />,
                title: "Customer-Centric Service",
                text: "Friendly support and hassle-free returns make shopping stress-free."
              },
              {
                icon: <HeartHandshake className="text-pink" size={28} />,
                title: "Celebrating Togetherness",
                text: "Collections designed to bring families closer through coordinated styles."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="card shadow-sm border-0 p-3 mb-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index}
              >
                <div className="d-flex align-items-center">
                  <div className="me-3">{item.icon}</div>
                  <div>
                    <h5 className="fw-bold mb-1">{item.title}</h5>
                    <p className="mb-0 text-muted">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side Image Cards */}
          <div className="col-lg-6">
            <div className="row g-3">
              {imageUrls.map((src, index) => (
                <motion.div
                  className="col-6 col-md-4"
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={index}
                >
                  <div className="card border-0 shadow-sm rounded overflow-hidden">
                    <img
                      src={src}
                      alt={`img-${index}`}
                      className="img-fluid w-100 h-100 object-fit-cover"
                      style={{ height: '180px' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDetails;
