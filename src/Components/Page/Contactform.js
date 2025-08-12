'use client';
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from 'next/image';
import Img3 from '../../assets/images/H2.jpg';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });

  const [formData, setFormData] = useState({ name: "", subject: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", subject: "", email: "", message: "" });
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-light font-poppins"
    >
      <div className="container py-5">
        <div className="row g-4 align-items-start justify-content-center">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="col-lg-5">
            <div className="card shadow rounded-4 p-4">
              <h2 className="text-center mb-4">Contact Us</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Enter your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email ID</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Enter your message</label>
                  <textarea
                    id="message"
                    rows="3"
                    className="form-control"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-dark w-100"
                >
                  Send Now
                </motion.button>

                {submitted && (
                  <p className="text-success text-center mt-3">
                    ✅ Your message has been sent successfully!
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Image + Social Media */}
          <div className="col-lg-5">
            <motion.div variants={itemVariants} className="mb-4">
              <Image
                src={Img3}
                alt="Contact"
                className="img-fluid rounded-4 shadow"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="card p-4 shadow rounded-4">
              <h4 className="text-center text-secondary mb-3">Connect With Us</h4>
              <div className="d-flex justify-content-center gap-4 mb-3">
                {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="text-secondary"
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
              <p className="text-muted text-center mb-0">
                Follow us on social media for updates and news
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contact Info + Map in one row */}
       {/* Contact Info + Map in one row */}
<motion.div
  variants={itemVariants}
  className="row mt-5 mx-auto w-100"
>
  {/* Contact Info */}
  <div className="col-md-6">
    <div className="bg-secondary text-white rounded-4 p-4 shadow h-100 d-flex align-items-center">
      <div className="row w-100 text-center">
        {/* Call Us */}
        <div className="mb-4 col-md-6 mb-md-0 d-flex flex-column align-items-center">
          <FaPhoneAlt size={28} className="mb-2" />
          <h5 className="fw-bold">CALL US</h5>
          <p className="mb-0">+91-7296988927</p>
        </div>
   {/* Email */}
        <div className="col-md-6 d-flex flex-column align-items-center">
          <FaEnvelope size={28} className="mb-2" />
          <h5 className="fw-bold">EMAIL</h5>
          <p className="mb-0 text-break">agpdienenprivatelimited@gmail.com</p>
        </div>
        {/* Location */}
        <div className=" mb-4 mb-md-0 d-flex flex-column align-items-center">
          <FaMapMarkerAlt size={28} className="mb-2" />
          <h5 className="fw-bold">LOCATION</h5>
          <p className="mb-0" style={{ fontSize: "0.9rem" }}>
            Office number 38, second floor, Omaxe Celebration Mall,
            Badshahpur Sohna Rd Hwy, Central Park II, Sector 48,
            Gurugram, Haryana 122001
          </p>
        </div>

     
      </div>
    </div>
  </div>

  {/* Map */}
  <div className="col-md-6">
    <div className="rounded-4 overflow-hidden shadow h-100">
      <iframe
        // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5938428143983!2d77.04274417495327!3d28.553586488942872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18b4aa1ed4e1%3A0xc1ec11ff9d7b7291!2sOmaxe%20Celebration%20Mall!5e0!3m2!1sen!2sin!4v1692109397684!5m2!1sen!2sin"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14034.917921378621!2d77.0181393554199!3d28.427418499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18748870d465%3A0x721233e4e1f3a60c!2sOmaxe%20Celebration%20Mall!5e0!3m2!1sen!2sin!4v1754984994998!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '250px' }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
    
  </div>
</motion.div>

      </div>
    </motion.div>
  );
};

export default Contact;
