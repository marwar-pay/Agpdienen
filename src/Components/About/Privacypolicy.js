import Header from "@/Layout/Header";

export default function PrivacyPolicy() {
    return (
        <>
            <Header />
            <div>
                <div className="bg-gray-50 py-8 px-6 sm:px-10 md:px-20">
                    <header className="text-center mb-12">
                        <h1 className="text-4xl font-semibold text-dark">Privacy Policy</h1>
                    </header>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-black-500 mb-4">Introduction</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            At Agpdienen Private Limited, your privacy is our priority. This Privacy Policy outlines how we collect, use, and protect your personal information when you shop for family wear clothing on our website.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-black-500 mb-4">Information We Collect</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            To provide you with the best shopping experience, we may collect the following types of information:
                        </p>
                        <ul className="list-disc pl-6 text-lg text-gray-700">
                            <li>Personal details such as name, email, and contact information.</li>
                            <li>Preferences related to family clothing styles and sizes.</li>
                            <li>Browsing data, including pages viewed and time spent on our website.</li>
                            <li>Payment information to process your orders securely.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-black-500 mb-4">How We Use Your Information</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We use the information collected to enhance your shopping experience, including:
                        </p>
                        <ul className="list-disc pl-6 text-lg text-gray-700">
                            <li>Processing and fulfilling your clothing orders efficiently.</li>
                            <li>Recommending clothing options suitable for your family’s needs.</li>
                            <li>Updating you on new arrivals, promotions, and discounts.</li>
                            <li>Ensuring a safe and secure shopping environment.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-black-500 mb-4">Data Protection</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We implement advanced security protocols to keep your personal information safe and secure. Your data is protected from unauthorized access and misuse.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold text-black-500 mb-4">Changes to This Policy</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We may update this Privacy Policy periodically to reflect changes in our practices. The latest version will always be available on this page. Please check back regularly to stay informed.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
}
