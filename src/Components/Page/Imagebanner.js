



'use client';

import Image from 'next/image';
import h1Image from '../../assets/images/H1.jpg';

const Title = ({ Heading, Subheading }) => {
  return (
    <section className="w-100">
      <div
        className="position-relative text-center text-white d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${h1Image.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '70vh',
        }}
      >
        <div className="container px-3">
          <div className="mx-auto" style={{ maxWidth: '960px' }}>
            <h1 className="fw-bold display-4 mb-3">{Heading}</h1>
            <h2 className="fw-medium fs-3">{Subheading}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Title;
