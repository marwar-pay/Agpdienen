import Image from 'next/image';
import img from '../assets/pinkcityimg/payment.jpg';
import logo from '../assets/pinkcityimg/logo.png';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-light text-dark pt-5">
      <div className="container">
        <div className="row g-4">
          {/* Logo & Contact Info */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">
              <div className="mb-3 text-center">
                <Image
                  src={logo}
                  alt="Company Logo"
                  style={{
                    width: '120px',
                    backgroundColor: '#fff',
                    borderRadius: '10px'
                  }}
                />
              </div>
              <p className="mb-1 small text-muted text-center">
                Have questions? Contact us at:
              </p>
              <p className="fw-bold text-center">
                <Link
                  href="mailto:agpdienenprivatelimited@gmail.com"
                  className="text-decoration-none text-dark"
                >
                  agpdienenprivatelimited@gmail.com
                </Link>
              </p>
              <address className="small text-muted text-center">
                Office number 38, second floor, Omaxe Celebration Mall, Badshahpur Sohna Rd Hwy,
                Central Park II, Sector 48, Gurugram, Haryana 122001
              </address>
              <p className="fw-bold text-center">
                <Link
                  href="tel:+91-7296988927"
                  className="text-decoration-none text-dark"
                >
                  +91-7296988927
                </Link>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">
              <h5 className="fw-bold mb-3 text-red">Useful Links</h5>
              <ul className="list-unstyled">
                {[
                  ['About Us', '/about'],
                  ['Privacy Policy', '/privacypolicy'],
                  ['Terms and Conditions', '/t&c'],
                  ['Refund Policy', '/refundpolicy'],
                  ['Shipping Policy', '/shipping_policy'],
                  ['Contact Us', '/contact']
                ].map(([label, path]) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className="text-decoration-none text-dark d-block py-1"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <Link href="#" className="text-dark me-3 fs-5">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link href="#" className="text-dark me-3 fs-5">
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link href="#" className="text-dark fs-5">
                  <i className="fab fa-instagram"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter & Payment */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">
              <h5 className="fw-bold mb-3 text-red">Our Finance Partners</h5>
              <p className="small text-muted">
                You may unsubscribe at any moment. Find our contact info in the legal notice.
              </p>
              <div className="d-flex mb-3">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="form-control me-2"
                />
                <button className="btn btn-primary">Subscribe</button>
              </div>
              <div className="text-center">
                <Image
                  src={img}
                  alt="Payment Methods"
                  className="img-fluid"
                  style={{ maxHeight: '50px', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-3 mt-4 border-top">
        <p className="mb-0 small text-muted">
          &copy; {new Date().getFullYear()} Agpdienen Private Limited. All Rights Reserved.
        </p>
      </div>

      <style >{`
        footer {
          font-size: 0.9rem;
        }
        .card {
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </footer>
  );
}
