


// export default function ContactForm() {
//   return (
//     <>
//     <div className="bg-light">
       
//         <header className="bg-dark text-white p-4 text-center">
//           <h1 className="h3">Contact Us</h1>
//           <p>We would love to hear from you!</p>
//         </header>

//         <div className="container py-5">
//           <div className="row g-4">
//             {/* Contact Form */}
//             <div className="col-12 col-md-6"  style={{height:'100%'}}>
//               <div className="bg-white p-4 shadow rounded">
//                 <h2 className="h4 text-dark mb-3">Get In Touch</h2>
//                 <form>
//                   <div className="mb-3">
//                     <label htmlFor="name" className="form-label">Name</label>
//                     <input type="text" id="name" className="form-control" placeholder="Your Name" required />
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email</label>
//                     <input type="email" id="email" className="form-control" placeholder="Your Email" required />
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="subject" className="form-label">Subject</label>
//                     <input type="text" id="subject" className="form-control" placeholder="Subject" required />
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="message" className="form-label">Your Message</label>
//                     <textarea id="message" className="form-control" rows="4" placeholder="Your Message" required></textarea>
//                   </div>

//                   <button type="submit" className="btn btn-primary w-100">Submit</button>
//                 </form>
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div className="col-12 col-md-6"  style={{height:'100%'}}>
//               <div className="bg-light p-4 shadow rounded">
//                 <h2 className="h4 text-dark mb-3">Contact Information</h2>
//                 <ul className="list-unstyled">
//                   <li className="mb-2">
//                     <strong>📞</strong> <a href="tel:+91-7296988927">+91-7296988927</a>
//                   </li>
//                   <li className="mb-2">
//                     <strong>📧</strong> <a href="mailto:Agpdienenprivatelimited@gmail.com">Agpdienenprivatelimited@gmail.com</a>
//                   </li>
//                   <li className="mb-2">
//                     <strong>📍</strong> Office number 38, second floor, Omaxe Celebration Mall, Badshahpur Sohna Rd Hwy, Central Park II, Sector 48, Gurugram, Haryana 122001
//                   </li>
//                 </ul>

//                 <h6 className="mt-4">Follow Us</h6>
//                 <div className="d-flex gap-3 mt-2">
//                   <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="text-dark">Facebook</a>
//                   <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-dark">Instagram</a>
//                   <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="text-dark">YouTube</a>
//                 </div>

//                 <div className="mt-4">
//                   <iframe
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.521229830895!2d75.66353797308687!3d26.9186857082351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4c883d4ffc41%3A0x19861f7d860a6af1!2sShiv%20Nagar%2C%2046-47%2C%20Sirsi%20Rd%2C%20behind%20Bharat%20Gas%20Godam%2C%20Bindayaka%2C%20Jaipur%2C%20Rajasthan%20302012!5e0!3m2!1sen!2sin!4v1735887916000!5m2!1sen!2sin"
//                     width="100%"
//                     height="300"
//                     style={{ border: 0 }}
//                     allowFullScreen
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                   ></iframe>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
// );
// }





'use client';
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from 'next/image';
import Img3 from '../../assets/images/H2.jpg';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });

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
          <motion.div
            variants={itemVariants}
            className="col-lg-5"
          >
            <div className="card shadow rounded-4 p-4">
              <h2 className="text-center mb-4">Contact Us</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Enter your Name</label>
                  <input type="text" id="name" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input type="text" id="subject" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email ID</label>
                  <input type="email" id="email" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Enter your message</label>
                  <textarea id="message" rows="3" className="form-control" />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-dark w-100"
                >
                  Send Now
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Image and Social Media Card */}
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

        {/* Contact Info */}
        <motion.div
          variants={itemVariants}
          className="row mt-5 mx-auto bg-secondary text-white rounded-4 p-4 shadow w-100"
        >
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <h5>CALL US</h5>
            <p className="mb-0">+91-7296988927</p>
          </div>
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <h5>LOCATION</h5>
            <p className="mb-0">Office number 38, second floor, Omaxe Celebration Mall, Badshahpur Sohna Rd Hwy, Central Park II, Sector 48, Gurugram, Haryana 122001</p>
          </div>
          <div className="col-md-4 text-center">
            <h5>EMAIL</h5>
            <p className="mb-0">Agpdienenprivatelimited@gmail.com</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
