// pages/refund-policy.js

import Header from "@/Layout/Header";

export default function RefundPolicy() {
  return (
    <>
      <Header />
      <div className="bg-gray-50 py-20 px-6 sm:px-10 md:px-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-dark">
            Refund & Return Policy
          </h1>
        </header>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-dark mb-4">
            Introduction
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Agpdienen Private Limited, we aim to ensure every customer has a
            smooth and satisfactory shopping experience. This Refund & Return
            Policy explains the conditions and procedures for returning products
            and receiving refunds.
          </p>
        </section>

        {/* Eligibility */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-dark mb-4">
            Eligibility for Returns & Refunds
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            You may request a return or refund within 10 days from the date of
            delivery if the following conditions are met:
          </p>
          <ul className="list-disc pl-6 text-lg text-gray-700">
            <li>
              The product is defective, damaged, or incorrect upon delivery.
            </li>
            <li>
              The product is in original condition—unused, unworn, and unwashed.
            </li>
            <li>
              All original packaging, including price tags, labels, and
              accessories, is intact and returned with the product.
            </li>
            <li>
              The product has not been altered, customized, or tampered with in
              any way.
            </li>
          </ul>
        </section>

        {/* Items not eligible */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-dark mb-4">
            Items Not Eligible for Refund/Return
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We do not accept returns or issue refunds for:
          </p>
          <ul className="list-disc pl-6 text-lg text-gray-700">
            <li>
              Products returned without original packaging, tags, or
              accessories.
            </li>
            <li>
              Products damaged due to misuse, negligence, or improper handling
              by the customer.
            </li>
            <li>
              Perishable or hygiene-sensitive items (e.g., undergarments) for
              safety reasons.
            </li>
            <li>Customized or made-to-order products.</li>
            <li>
              Items purchased during clearance or final sale events (unless
              defective).
            </li>
          </ul>
        </section>

        {/* How to request */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-dark mb-4">
            How to Request a Return or Refund
          </h2>
          <ol className="list-decimal pl-6 text-lg text-gray-700">
            <li>Contact our Customer Support within 10 days of delivery.</li>
            <li>
              Provide your order number, product details, and the reason for
              return.
            </li>
            <li>
              Our team will review your request and provide return instructions
              if eligible.
            </li>
          </ol>
          <p className="mt-4 text-lg text-gray-700">
            📧 Email:{" "}
            <a
              href="mailto:agpdienenprivatelimited@gmail.com"
              className="text-blue-600 underline"
            >
              agpdienenprivatelimited@gmail.com
            </a>
            <br />
            📞 Phone:{" "}
            <a href="tel:+917296988927" className="text-blue-600 underline">
              +91-7296988927
            </a>
          </p>
        </section>

        {/* Refund process */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-dark mb-4">
            Refund Process
          </h2>
          <ul className="list-disc pl-6 text-lg text-gray-700">
            <li>
              Once the returned product is received and inspected, we will
              notify you of the approval or rejection of your refund.
            </li>
            <li>
              If approved, your refund will be processed within 7–10 business
              days.
            </li>
            <li>
              The refund will be credited to your original payment method.
              Processing times may vary depending on your bank or payment
              provider.
            </li>
          </ul>
        </section>

        {/* Exchange Policy */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-dark mb-4">
            Exchange Policy
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you wish to exchange a product for a different size or color,
            please contact us. Exchanges are subject to stock availability.
          </p>
        </section>

        {/* Shipping costs */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-dark mb-4">
            Shipping Costs for Returns
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            If the return is due to a change of mind or incorrect order by the
            customer, return shipping charges will be the customer’s
            responsibility.
          </p>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-600 mt-12">
          Copyright © 2025 Agpdienen Private Limited. All Rights Reserved.
        </footer>
      </div>
    </>
  );
}
