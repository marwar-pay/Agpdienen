import Image from 'next/image';
import img from '../../assets/pinkcityimg/productsmarque/about1.png';

export default function About() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Left Column (Image) */}
        <div className="col-md-6">
          <div className="image-container mb-4 mb-md-0 image-wrappe">
            <Image
              src={img}
              alt="About Us"
              className="img-fluid rounded zoom-effect "
            />
          </div>
        </div>

        {/* Right Column (Content) */}
        <div className="col-md-6">
  <h1 className="text-pink mb-3">About Agpdienen Private Limited</h1>
  <p className="text-muted">
    Welcome to Agpdienen.com, your go-to destination for fashion and clothing online! We are passionate about style, quality, and bringing you the latest trends at affordable prices.  
    <br/><br/>
    Founded by a team of fashion enthusiasts, our mission is to offer a seamless shopping experience with a diverse collection that caters to all styles and occasions—whether it's trendy streetwear or chic formal attire.  
    <br/><br/>
    More than just a fashion store, we are a community that believes in self-expression through clothing. We strive to empower and inspire you with fashion that fits your personality and budget.  
    <br/><br/>
    At Agpdienen.com, customer satisfaction is our top priority. With fast shipping, easy returns, and dedicated support, we ensure a hassle-free shopping experience.  
    <br/><br/>
    Thank you for choosing Agpdienen.com. Whether you're shopping for yourself or searching for the perfect gift, we are here to help you look and feel your best. Happy Shopping!
  </p>
</div>

      </div>
    </div>
  );
}
