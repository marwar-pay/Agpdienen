'use client';

import { apiGet } from '@/api/apiMethods';
import { useEffect, useState } from 'react';

const Title = ({ Heading, Subheading }) => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await apiGet('api/banner/contact-us');
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setBanner(res.data[0]); // ✅ take the first banner
        }
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <section className="w-100">
      <div
        className="position-relative text-center text-white d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: banner
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${banner.imageUrl})`
            : 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))',
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

            {/* Render altText (supports HTML) */}
            {banner?.altText && (
              <div
                className="mt-3"
                dangerouslySetInnerHTML={{ __html: banner.altText }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Title;
