import Header from "@/Layout/Header";

export default function PrivacyPolicy() {
    return (
        <>
            <Header />
            <div>
                <div className="bg-gray-50 py-20 px-6 sm:px-10 md:px-20">
                    <header className="text-center mb-12">
                        <h1 className="text-4xl font-semibold text-dark">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Effective Date: 11 August 2025
                        </p>
                    </header>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">1. Introduction</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            At Agpdienen Private Limited, we value your trust. This Privacy Policy explains how we collect, use, store, and protect your personal information when you shop for clothing and related products on{" "}
                            <a href="https://www.agpdienen.com" className="text-blue-600 underline">
                                www.agpdienen.com
                            </a>.
                            By using our website, you agree to the terms of this Privacy Policy.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">2. Information We Collect</h2>
                        <ul className="list-disc pl-6 text-lg text-gray-700 leading-relaxed">
                            <li>Personal Information: Name, email address, contact number, billing/shipping address.</li>
                            <li>Account Details: Login credentials if you create an account.</li>
                            <li>Order Information: Products purchased, payment method, transaction details.</li>
                            <li>Preferences: Clothing sizes, styles, and purchase history.</li>
                            <li>Browsing Data: IP address, device type, browser type, pages visited, time spent.</li>
                            <li>Payment Information: Processed securely through our payment gateway partners.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">3. How We Use Your Information</h2>
                        <ul className="list-disc pl-6 text-lg text-gray-700 leading-relaxed">
                            <li>Processing and delivering your orders.</li>
                            <li>Sending order confirmations, invoices, and shipping updates.</li>
                            <li>Providing personalized clothing recommendations.</li>
                            <li>Informing you about promotions, offers, and new arrivals (with your consent).</li>
                            <li>Improving website performance and customer experience.</li>
                            <li>Preventing fraud and ensuring secure transactions.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">4. Cookies & Tracking Technologies</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We use cookies to improve your browsing experience. Cookies help us remember your preferences, track your cart, and analyze website performance. You can disable cookies in your browser settings, but some website features may not work correctly.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">5. Data Sharing & Disclosure</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We do not sell your personal information. We may share your data only with:
                        </p>
                        <ul className="list-disc pl-6 text-lg text-gray-700 leading-relaxed">
                            <li>Payment processors for secure transactions.</li>
                            <li>Delivery partners to ship your orders.</li>
                            <li>Service providers for website hosting, analytics, and marketing (bound by confidentiality).</li>
                            <li>Legal authorities when required by law.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">6. Data Protection & Security</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We use industry-standard security measures, including SSL encryption, firewalls, and secure servers, to protect your personal information from unauthorized access, loss, or misuse.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">7. Your Rights</h2>
                        <ul className="list-disc pl-6 text-lg text-gray-700 leading-relaxed">
                            <li>Access, update, or delete your personal data.</li>
                            <li>Opt-out of marketing emails at any time by clicking “Unsubscribe” or contacting us.</li>
                            <li>Request details of the information we hold about you.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">8. Third-Party Links</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these sites.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-4">10. Contact Us</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            If you have any questions about this Privacy Policy or your data, contact us at:
                        </p>
                        <ul className="list-none text-lg text-gray-700 leading-relaxed">
                            <li>📧 Email: <a href="mailto:agpdienenprivatelimited@gmail.com" className="text-blue-600 underline">agpdienenprivatelimited@gmail.com</a></li>
                            <li>📍 Address: Office No. 38, Second Floor, Omaxe Celebration Mall, Badshahpur Sohna Rd Hwy, Central Park II, Sector 48, Gurugram, Haryana 122001</li>
                            <li>📞 Phone: +91-7296988927</li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-6">
                            Copyright © 2025 Agpdienen Private Limited. All Rights Reserved.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
}
