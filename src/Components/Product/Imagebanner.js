// import Image from 'next/image';
// import img from '../../assets/pinkcityimg/3.jpg';
// export default function ImagePage() {
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
//       <Image
//         src={img} // Place your image inside the 'public' folder
//         alt="Your Image Description"
//         width={'90%'} // You can adjust the width as needed
//         height={600} // You can adjust the height as needed
//       />
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';

const ImagePage = ({ Heading, Subheading }) => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch('https://ajay.yunicare.in/api/banner/about');
        const data = await res.json();
        setBanner(data);
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
            {banner && banner.altText && (
              // <h1 className="mt-3">{banner.altText}</h1>
              <div
  dangerouslySetInnerHTML={{ __html: banner?.altText }}
/>

            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImagePage;
