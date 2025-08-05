import Image from 'next/image';
import img from '../../assets/pinkcityimg/2.png';
export default function ImagePage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image
        src={img} // Place your image inside the 'public' folder
        alt="Your Image Description"
        width={'90%'} // You can adjust the width as needed
        height={600} // You can adjust the height as needed
      />
    </div>
  );
}
