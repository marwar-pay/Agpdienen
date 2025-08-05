import { useState } from 'react';
import Image from 'next/image';


export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    alert('Subscribed successfully!');
  };

  return (
    <div
      className="container-fluid newsletter mt-5 "
    
    >
     
   

      {/* Newsletter Content */}
      <div  style={{ backgroundColor: 'black' ,padding:'40px 20px',marginBottom:'60px',textAlgn:'center' }} className="newsletter__content ">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-content__inner">
                <h2 style={{ color: 'white',textAlign:'center' }}>Subscribe To Our Newsletter</h2> {/* Ensure text is visible on black */}
              </div>
            </div>
            <div className="offset-md-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <form
                className="newsletter__form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="newsletter__form-content position-relative">
                  {/* Input Field */}
                  <label
                    className="position-absolute top-50 start-0 translate-middle-y ps-3"
                    htmlFor="newsletter-mail"
                  >
                    <i className="icon-mail" style={{ color: 'white' }}></i> {/* Icon color */}
                  </label>
                  <input
                    type="email"
                    id="subscriber_email_home"
                    name="subscriber_email"
                    className="form-control ps-5"
                    placeholder="Your mail address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* Error Message */}
                  {error && <div className="text-danger mt-2">{error}</div>}
                  <button
                    className="text-uppercase position-absolute end-0 top-50 translate-middle-y pe-4"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
