// pages/shipping-policy.js

import Header from "@/Layout/Header";

export default function ShippingPolicy() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-3xl text-center mb-12 text-4xl font-semibold text-dark">Shipping Policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Delivery Time</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Standard Delivery:</strong> 2–3 business days from the date of order confirmation.
            </li>
            <li>
              Delivery timelines may vary during peak seasons, public holidays, or due to unforeseen circumstances such as weather delays, strikes, or courier issues.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Shipping Charges</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Applicable shipping charges (if any) will be displayed at checkout before you confirm your order.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Order Processing</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Orders are processed and dispatched within 24 hours of confirmation.</li>
            <li>
              Once shipped, you will receive a tracking number via email or SMS to monitor your delivery.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Shipping Areas</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We currently ship to all major cities and towns within India.</li>
            <li>
              Deliveries to remote or rural areas may take longer than the standard delivery time.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Undeliverable Packages</h2>
          <p>If your order cannot be delivered due to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Incorrect or incomplete address</li>
            <li>Repeated failed delivery attempts</li>
            <li>Refusal to accept the package</li>
          </ul>
          <p className="mt-2">
            Our customer support team will contact you to arrange redelivery. Additional shipping fees may apply in such cases.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Tracking Your Order</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Once your order is dispatched, you will receive tracking details via email or SMS.</li>
            <li>
              You can track your shipment on the courier partner’s website using the tracking number provided.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p>For questions or concerns regarding shipping, contact us at:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              📧 Email:{" "}
              <a
                href="mailto:agpdienenprivatelimited@gmail.com"
                className="text-blue-600 underline"
              >
                agpdienenprivatelimited@gmail.com
              </a>
            </li>
            <li>📞 Phone: +91-7296988927</li>
          </ul>
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
