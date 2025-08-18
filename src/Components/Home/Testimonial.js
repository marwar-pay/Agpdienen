'use client';
import Image from "next/image";
import { FaStar } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Anjali M.',
      role: 'Happy Mother',
      feedback:
        'Agpdienen has an amazing collection of family wear. The quality is fantastic, and I found perfect outfits for everyone in the family. Highly recommend!',
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
    },
    {
      name: 'The Sharma Family',
      role: 'Satisfied Customers',
      feedback:
        'Shopping for family wear has never been easier! Agpdienen’s wide variety of sizes and styles made it simple for us to find matching outfits. Excellent service!',
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop",
      rating: 4,
    },
    {
      name: 'Rahul K.',
      role: 'Frequent Shopper',
      feedback:
        'I loved the experience! From kids’ clothing to stylish outfits for adults, Agpdienen has it all. Great quality and fast delivery.',
      image: "https://randomuser.me/api/portraits/men/43.jpg",
      rating: 4,
    },
    {
      name: 'Priya S.',
      role: 'First-time Buyer',
      feedback:
        'I was pleasantly surprised by the affordable prices and great styles. My kids love their new clothes!',
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      rating: 5,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-danger">What Our Customers Say</h2>
          <p className="text-muted mt-2">
            Hear what our customers have to say about their experience shopping for family wear on PinkCity.
          </p>
        </div>

        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-3 mb-4">
              <div className="card border-0 shadow h-100 text-center p-4">
                <div className="mx-auto mb-3" style={{ width: "100px", height: "100px" }}>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={100}
                    height={100}
                    className="rounded-circle border border-3 border-danger object-fit-cover"
                  />
                </div>
                <h5 className="fw-semibold">{testimonial.name}</h5>
                <small className="text-danger d-block mb-2">{testimonial.role}</small>
                <div className="d-flex justify-content-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < testimonial.rating ? '#fbbf24' : '#e5e7eb'}
                      size={18}
                    />
                  ))}
                </div>
                <p className="text-muted small">{testimonial.feedback}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
