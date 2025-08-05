import Image from 'next/image';
import img from '../../assets/pinkcityimg/productsmarque/1.jpg';
import img1 from '../../assets/pinkcityimg/productsmarque/2.jpg';
import img2 from '../../assets/pinkcityimg/productsmarque/3.jpg';
import img3 from '../../assets/pinkcityimg/productsmarque/4.jpg';
import img4 from '../../assets/pinkcityimg/productsmarque/5.jpg';
import img5 from '../../assets/pinkcityimg/productsmarque/6.jpg';
import img6 from '../../assets/pinkcityimg/productsmarque/7.jpg';
import img7 from '../../assets/pinkcityimg/productsmarque/8.jpg';
import img8 from '../../assets/pinkcityimg/productsmarque/9.jpg';
import img9 from '../../assets/pinkcityimg/productsmarque/10.jpg';
import img10 from '../../assets/pinkcityimg/productsmarque/11.jpg';
import img11 from '../../assets/pinkcityimg/productsmarque/12.jpg';

export default function Marquee() {
  return (
    <div className="marquee-container bg-light py-3">
      <div className="marquee">
        {/* Images in a single row */}
        {[img, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11].map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Brand ${index + 1}`}
            className="mx-3"
            style={{ width: '25%', height: '150px' }} // Set consistent width
          />
        ))}
      </div>

      <style jsx>{`
        .marquee-container {
          overflow: hidden;
          position: relative;
          z-index: 1;
          margin-top:20px;
        }
  

        .marquee {
          display: flex;
          gap: 15px; /* Space between images */
          animation: scroll 15s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
