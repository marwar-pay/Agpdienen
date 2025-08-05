
// import Image from 'next/image';
// import img from '../assets/pinkcityimg/payment.jpg';
// import logo from '../assets/pinkcityimg/logo.png';
// import Link from 'next/link';
// export default function Footer() {
//   return (
//     <footer className="bg-dark text-light pt-5 mt-5">
//       <div className="container">
//         <div className="row">   
//           {/* Contact Section */}
//           <div className="col-md-4">
//             <Image src={logo} style={{width:'30%',backgroundColor:'#fff',borderRadius:'10px'}}/>
          
//             <p>If you have any question, please contact us at</p>
//             <Link href="mailto:Agpdienenprivatelimited@gmail.com" className="text-light d-block mb-2">
//             Agpdienenprivatelimited@gmail.com
//             </Link>
//             <address>
//             First Floor 85, Shiv Nagar,Bindayaka jaipur Rajathan Pincode - 302012
              
//             </address>
//             <Link href="tel:+91-7296988927" className="text-light">
//               +91-7296988927
//             </Link>
//           </div>

//           {/* Information Links */}
//           <div className="col-md-4">
//             <h5 className="text-uppercase mb-3">Information</h5>
//             <ul className="list-unstyled">
//               <li>
//                 <Link href="/about" className="text-light">About Us</Link>
//               </li>
//               <li>
//                 <Link href="/privacypolicy" className="text-light">Privacy Policy</Link>
//               </li>
//               <li>
//                 <Link href="/t&c" className="text-light">Terms and Conditions</Link>
//               </li>
//               <li>
//                 <Link href="/refundpolicy" className="text-light">Refund Policy</Link>
//               </li>
//               <li>
//                 <Link href="/shipping_policy" className="text-light">Shipping Policy</Link>
//               </li>
//               <li>
//                 <Link href="/contact" className="text-light">Contact Us</Link>
//               </li>
//             </ul>
//             <div className="mt-3">
//               <Link href="#" className="text-light me-3">
//                 <i className="fab fa-facebook"></i>
//               </Link>
//               <Link href="#" className="text-light me-3">
//                 <i className="fab fa-youtube"></i>
//               </Link>
//               <Link href="#" className="text-light">
//                 <i className="fab fa-instagram"></i>
//               </Link>
//             </div>
//           </div>

//           {/* Finance Partners */}
//           <div className="col-md-4">
//             <h5 className="text-uppercase mb-3">Our Finance Partners</h5>
//             <p>You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.</p>
//             <div className="mb-3">
//               <input
//                 type="email"
//                 placeholder="Enter your email here..."
//                 className="form-control mb-2"
//               />
//               <button className="btn btn-primary w-100">Submit</button>
//             </div>
//             <div className="d-flex align-items-center">
//              <Image src={img}/>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-dangers text-light text-center py-3 mt-4">
//         <p className="mb-0">Copyright &copy; {new Date().getFullYear()}Agpdienen private limited All Rights Reserved</p>
//       </div>
//     </footer>
//   );
// }




import Image from 'next/image';
import img from '../assets/pinkcityimg/payment.jpg';
import logo from '../assets/pinkcityimg/logo.png';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5">
      <div className="container">
        <div className="row gy-4">
          {/* Logo & Contact Info */}
          <div className="col-md-4">
            <div className="mb-3">
              <Image
                src={logo}
                alt="Company Logo"
                style={{ width: '120px', backgroundColor: '#fff', borderRadius: '10px' }}
              />
            </div>
            <p>If you have any questions, contact us at:</p>
            <p>
              <Link href="mailto:Agpdienenprivatelimited@gmail.com" className="text-light d-block">
                Agpdienenprivatelimited@gmail.com
              </Link>
            </p>
            <address className="small">
             Office number 38, second floor, Omaxe Celebration Mall, Badshahpur Sohna Rd Hwy, Central Park II, Sector 48, Gurugram, Haryana 122001
            </address>
            <p>
              <Link href="tel:+91-7296988927" className="text-light d-block">
                +91-7296988927
              </Link>
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="text-uppercase mb-3">Useful Links</h5>
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
                  <Link href={path} className="text-light d-block mb-1">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-3">
              <Link href="#" className="text-light me-3 fs-5">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link href="#" className="text-light me-3 fs-5">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link href="#" className="text-light fs-5">
                <i className="fab fa-instagram"></i>
              </Link>
            </div>
          </div>

          {/* Finance Partners / Newsletter */}
          <div className="col-md-4">
            <h5 className="text-uppercase mb-3">Our Finance Partners</h5>
            <p className="small">
              You may unsubscribe at any moment. For that purpose, find our contact info in the legal notice.
            </p>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Enter your email here..."
                className="form-control mb-2"
              />
              <button className="btn btn-primary w-100">Subscribe</button>
            </div>
            <div>
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

      {/* Bottom Bar */}
      <div className="text-center py-3 mt-4 border-top border-light">
        <p className="mb-0 small">
          &copy; {new Date().getFullYear()} Agpdienen Private Limited. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
