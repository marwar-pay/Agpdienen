// pages/about.js

import Image from "next/image";
import img from '../../assets/pinkcityimg/productsmarque/about.jpg'
import img1 from '../../assets/pinkcityimg/productsmarque/about1.png'

export default function About() {
  return (
    <>
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left Column (Image) */}
          <div className="col-md-6">
            <div className="image-container mb-4 mb-md-0 image-wrappe">
              <Image
                src={img}
                alt="About Us"
                className="img-fluid rounded shadow-lg zoom-effect"
              />
            </div>
          </div>

          {/* Right Column (Content) */}
          <div className="col-md-6">
            <h1 className="text-dark mb-3">About Agpdienen Private Limited</h1>
            <p className="text-muted">
              At Agpdienen Private Limited, we take pride in being your go-to destination for stylish and comfortable family wear clothing. From trendy outfits for kids to elegant styles for adults, we cater to the fashion needs of every family member, making us your one-stop shop for all things clothing.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 py-8 px-6 sm:px-10 md:px-20">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-dark">Bringing Families Together Through Fashion</h1>
          </header>
          <div className="row align-items-center">
          <div className="col-md-6">
            <div className="image-container mb-4 mb-md-0 image-wrappe">
              <Image
                src={img1}
                alt="About Us"
                className="img-fluid rounded zoom-effect"
              />
            </div>
          </div>
          <div className="col-md-6">
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-dark mb-4">Our Focus</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Agpdienen Private Limited is dedicated to providing high-quality, stylish, and affordable clothing for families. Whether it`s casual wear, festive attire, or everyday essentials, we have something special for everyone.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-dark mb-4">Why Families Choose Us?</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-center">
                <span className="mr-2 text-blue-600">✔</span> <strong>Wide Range of Options:</strong> From toddlers to adults, we cover all age groups.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-600">✔</span> <strong>Premium Quality:</strong> Durable fabrics and impeccable craftsmanship.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-600">✔</span> <strong>Affordable Pricing:</strong> Stylish clothing without breaking the bank.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-600">✔</span> <strong>Customer-Centric Approach:</strong> Exceptional support and easy returns.
              </li>
            </ul>
          </section>
</div>
</div>
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-dark mb-4">Our Journey</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Agpdienen Private Limited started with a dream of making quality family wear accessible to everyone. Over the years, we have become a trusted name for families looking for trendy and comfortable clothing options.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">Our Commitment</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are committed to offering an unmatched shopping experience, ensuring that every family finds the perfect attire for every occasion. At Agpdienen, we celebrate the joy of family through fashion.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
