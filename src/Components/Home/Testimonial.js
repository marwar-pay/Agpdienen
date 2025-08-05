import Image from "next/image";
import img1 from '../../assets/pinkcityimg/userwoman.png'; // Female image
import img2 from '../../assets/pinkcityimg/userwoman.png'; // Family image
import img3 from '../../assets/pinkcityimg/userman.png'; // Male image
import { FaStar } from 'react-icons/fa'; // Import star icon from react-icons

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Anjali M.',
      role: 'Happy Mother',
      feedback:
        'Agpdienen has an amazing collection of family wear. The quality is fantastic, and I found perfect outfits for everyone in the family. Highly recommend!',
      image: img1, // Female image
      rating: 5, // Add rating here
    },
    {
      name: 'The Sharma Family',
      role: 'Satisfied Customers',
      feedback:
        'Shopping for family wear has never been easier! Agpdienen’s wide variety of sizes and styles made it simple for us to find matching outfits. Excellent service!',
      image: img2, // Family image
      rating: 4, // Add rating here
    },
    {
      name: 'Rahul K.',
      role: 'Frequent Shopper',
      feedback:
        'I loved the experience! From kids’ clothing to stylish outfits for adults, Agpdienen has it all. Great quality and fast delivery.',
      image: img3, // Male image
      rating: 4, // Add rating here
    },
  ];

  return (
    <div className="container py-5">
      <h1 className="text-center text-pink mb-4">What Our Customers Say</h1>
      <p className="text-center text-secondary mb-5">
        Hear what our customers have to say about their experience shopping for family wear on PinkCity.
      </p>

      <div className="row">
        {testimonials.map((testimonial, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-circle mb-3"
                  style={{ width: '100px', height: '100px' }}
                />
                <h5 className="card-title text-dark">{testimonial.name}</h5>
                <h6 className="text-muted">{testimonial.role}</h6>
                <div className="ms-3">
                  <div className="d-flex justify-content-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < testimonial.rating ? '#ffc107' : '#e4e5e9'} // Yellow for filled stars
                        size={20}
                      />
                    ))}
                  </div>
                </div>
                <p className="card-text text-secondary mt-3">
                  {testimonial.feedback}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
