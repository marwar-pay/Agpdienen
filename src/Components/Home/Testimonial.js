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
    {
      name: 'Vikram R.',
      role: 'Business Professional',
      feedback:
        'Their formal wear section is top-notch. I found great outfits for work and weekend wear in one place.',
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      rating: 4,
    },
    {
      name: 'Neha K.',
      role: 'Fashion Enthusiast',
      feedback:
        'Stylish, comfortable, and budget-friendly — Agpdienen ticks all the boxes for me!',
      image: "https://randomuser.me/api/portraits/women/77.jpg",
      rating: 5,
    },
    {
      name: 'Arjun & Meera',
      role: 'Newly Married Couple',
      feedback:
        'Loved the matching outfits section! Perfect for our honeymoon and family gatherings.',
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: 'Sonia L.',
      role: 'Regular Customer',
      feedback:
        'They remember my preferences and offer great suggestions every time I shop. Feels personal!',
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      rating: 5,
    },
    {
      name: 'Karan M.',
      role: 'Happy Father',
      feedback:
        'Finally a brand where I can shop for my kids, my wife, and myself in one go. Saves time and money!',
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      rating: 4,
    },
    {
      name: 'The Gupta Family',
      role: 'Loyal Customers',
      feedback:
        'From festive clothes to daily wear, they’ve become our go-to brand for all family clothing needs.',
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop",
      rating: 5,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 992, // Tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-pink mb-4">What Our Customers Say</h1>
      <p className="text-center text-secondary mb-5">
        Hear what our customers have to say about their experience shopping for family wear on PinkCity.
      </p>

      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="px-3">
            <div className="card border-0 shadow-sm text-center p-4 h-100">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={100}
                height={100}
                className="rounded-circle mx-auto mb-3"
              />
              <h5 className="text-dark">{testimonial.name}</h5>
              <h6 className="text-muted">{testimonial.role}</h6>
              <div className="d-flex justify-content-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < testimonial.rating ? '#ffc107' : '#e4e5e9'}
                    size={20}
                  />
                ))}
              </div>
              <p className="text-secondary">{testimonial.feedback}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
