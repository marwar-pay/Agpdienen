


export default function ContactForm() {
  return (
    <>
    <div className="bg-light">
       
        <header className="bg-dark text-white p-4 text-center">
          <h1 className="h3">Contact Us</h1>
          <p>We would love to hear from you!</p>
        </header>

        <div className="container py-5">
          <div className="row g-4">
            {/* Contact Form */}
            <div className="col-12 col-md-6"  style={{height:'100%'}}>
              <div className="bg-white p-4 shadow rounded">
                <h2 className="h4 text-dark mb-3">Get In Touch</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" className="form-control" placeholder="Your Name" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" placeholder="Your Email" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input type="text" id="subject" className="form-control" placeholder="Subject" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Your Message</label>
                    <textarea id="message" className="form-control" rows="4" placeholder="Your Message" required></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-12 col-md-6"  style={{height:'100%'}}>
              <div className="bg-light p-4 shadow rounded">
                <h2 className="h4 text-dark mb-3">Contact Information</h2>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <strong>📞</strong> <a href="tel:+91-7296988927">+91-7296988927</a>
                  </li>
                  <li className="mb-2">
                    <strong>📧</strong> <a href="mailto:Agpdienenprivatelimited@gmail.com">Agpdienenprivatelimited@gmail.com</a>
                  </li>
                  <li className="mb-2">
                    <strong>📍</strong> Office number 38, second floor, Omaxe Celebration Mall, Badshahpur Sohna Rd Hwy, Central Park II, Sector 48, Gurugram, Haryana 122001
                  </li>
                </ul>

                <h6 className="mt-4">Follow Us</h6>
                <div className="d-flex gap-3 mt-2">
                  <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="text-dark">Facebook</a>
                  <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-dark">Instagram</a>
                  <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="text-dark">YouTube</a>
                </div>

                <div className="mt-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.521229830895!2d75.66353797308687!3d26.9186857082351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4c883d4ffc41%3A0x19861f7d860a6af1!2sShiv%20Nagar%2C%2046-47%2C%20Sirsi%20Rd%2C%20behind%20Bharat%20Gas%20Godam%2C%20Bindayaka%2C%20Jaipur%2C%20Rajasthan%20302012!5e0!3m2!1sen!2sin!4v1735887916000!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
);
}
