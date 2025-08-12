import { FaShippingFast, FaHistory, FaCreditCard, FaHeadset } from 'react-icons/fa';

export default function BestsellerSection() {
  const features = [
    {
      icon: <FaShippingFast size={40} />,
      title: 'FREE DELIVERY',
      description: 'When ordering from Rs. 10000.',
    },
    {
      icon: <FaHistory size={40} />,
      title: 'ASSURED BUYBACK',
      description: 'Limited time offer',
    },
    {
      icon: <FaCreditCard size={40} />,
      title: 'SECURE PAYMENT',
      description: '100% secure payment',
    },
    {
      icon: <FaHeadset size={40} />,
      title: '24/7 SUPPORT',
      description: 'Dedicated support',
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">
            You Are Shopping <span className="text-red">For An Experience</span>
          </h2>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div
                className="card border-0 shadow-sm h-100 text-center p-4 feature-card"
                style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              >
                <div className="mb-3 text-red">{feature.icon}</div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted small mb-0">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
}
