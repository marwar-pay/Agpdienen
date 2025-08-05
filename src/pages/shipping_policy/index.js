// pages/shipping-policy.js

import Header from "@/Layout/Header";


export default function ShippingPolicy() {
  return (
    <>
   
<Header/>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Delivery Time</h2>
          <p>
            Standard delivery time: <strong>2-3 business days</strong> from the date of order confirmation.
          </p>
          <p>
            Please note that delivery times may be longer during peak seasons, holidays, or due to unforeseen circumstances such as weather delays or carrier issues.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Shipping Charges</h2>
          <p>
            Shipping charges (if applicable) will be calculated and displayed at checkout.
          </p>
          <p>
            Free shipping may be offered on certain products or for orders exceeding a specified amount, as indicated on our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Order Processing</h2>
          <p>
            Orders are processed and dispatched within <strong>24 hours</strong> of confirmation.
          </p>
          <p>
            Once your order is shipped, you will receive a confirmation email or SMS with the tracking details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Shipping Areas</h2>
          <p>
            We currently ship to all major cities and towns within India. If you reside in a remote location, delivery times may vary.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Undeliverable Packages</h2>
          <p>
            In the event that a package is undeliverable due to an incorrect address, failed delivery attempts, or other reasons, our customer support team will contact you for further instructions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Tracking Your Order</h2>
          <p>
            After dispatch, you will receive a tracking number via email or SMS. You can use this to monitor the progress of your delivery on the carrier’s website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding your order or shipping, please feel free to contact our customer support team at <a href="mailto:Agpdienenprivatelimited@gmail.com" className="text-blue-600 underline">Agpdienenprivatelimited@gmail.com</a>.
          </p>
        </section>

        <section className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-xl font-medium">Note:</h3>
          <p>
            Shipping policies are subject to change without prior notice. Please refer to this page for the latest updates.
          </p>
        </section>
      </main>
    </>
  );
}
