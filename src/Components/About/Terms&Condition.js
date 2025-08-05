import Header from "@/Layout/Header";

export default function TermsAndConditions() {
  return (
    <>
      <Header />
      <div>
        <div className="bg-gray-50 py-8 px-6 sm:px-10 md:px-20">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-semibold" style={{ color: "rgb(2, 3, 10)" }}>
              Terms and Conditions
            </h1>
          </header>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4" style={{ color: "rgb(6, 7, 19)" }}>
              Introduction
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              By using the Agpdienen Private Limited website and services, you agree to comply with the following Terms and Conditions. Please read them carefully before making purchases or using our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4" >
              Use of the Website
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              You agree to use our website for lawful purposes only. Activities that compromise the website’s integrity, availability, or functionality are strictly prohibited.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4" >
              Account Responsibility
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              If you create an account on our platform, you are responsible for maintaining the confidentiality of your login details and for all activities that occur under your account. Ensure that your information is accurate and up to date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4" >
              Payment and Orders
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              By placing an order, you agree to provide accurate payment details and accept responsibility for the purchase. Orders are subject to acceptance, and we reserve the right to cancel or modify orders if necessary.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4" >
              Product Descriptions
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We strive to ensure that product descriptions and images are accurate. However, slight variations in color, size, or design may occur due to display settings or manufacturing updates.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4" >
              Returns and Refunds
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our return and refund policy allows customers to return items that meet our eligibility criteria. Please review our Returns Policy for detailed information on how to initiate a return or refund.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4" >
              Limitation of Liability
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Agpdienen Private Limited is not liable for any indirect, incidental, or consequential damages arising from the use of our website or the unavailability of our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4" >
              Changes to Terms
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We reserve the right to update or modify these Terms and Conditions at any time. Updated versions will be posted on this page, and continued use of our website constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4" >
              Contact Us
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              For any questions regarding these Terms and Conditions, please contact us through our website or customer support.
            </p>
          </section>

       
        </div>
      </div>
    </>
  );
}
