import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TermsAndConditions() {
    const [isChecked, setIsChecked] = useState(false);
    const [isRead, setIsRead] = useState(false);

    // Detect when the user scrolls to the bottom of the Terms and Conditions box
    const handleScroll = (e) => {
        const element = e.target;
        if (element.scrollTop + element.clientHeight >= element.scrollHeight - 1) {
            setIsRead(true);
        }
    };

    // Handle checkbox state
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    // Handle Agree button click
    const handleAgree = () => {
        toast.success("Terms and conditions accepted!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white items-center justify-center px-4">
            {/* Toast Container */}
            <ToastContainer />

            {/* Image Section */}
            <div className="lg:w-1/2 flex items-center justify-center p-4">
                <img
                    className="max-h-80 max-w-full lg:max-h-full lg:max-w-lg"
                    src="https://cdni.iconscout.com/illustration/premium/thumb/artificial-intelligence-robot-handshake-with-human-illustration-download-in-svg-png-gif-file-formats--agreement-computer-robots-and-for-business-pack-science-technology-illustrations-9416910.png"
                    alt="AI Handshake"
                />
            </div>

            {/* Terms and Conditions Section */}
            <div className="lg:w-1/2 bg-gray-800 rounded-lg p-6 max-w-lg w-full shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
                {/* Scrollable Content */}
                <div
                    className="h-60 overflow-y-scroll border border-gray-700 rounded-md p-4 mb-4"
                    onScroll={handleScroll}
                >
                    <p>

                        1. Acceptance of Terms
                        <br />
                        By accessing or using [Your Website Name] (the "Website"), you agree
                        to comply with and be bound by the following Terms and Conditions.
                        <br />
                        <br />
                        2. Data Privacy and Protection
                        <br />
                        2.1 Personal Data Protection (India) In India, the Personal Data
                        Protection Bill (PDPB) governs the collection, storage, and
                        processing of personal data. By using this Website, you consent to
                        our collection and processing of personal data in accordance with
                        our privacy practices, as outlined below.
                        <br />
                        <br />
                        2.2 User Rights
                        <br />
                        As a user, you have the following rights regarding your personal
                        data: - Right to Access: You may request a copy of your personal
                        data stored with us. - Right to Correction: You may correct any
                        inaccurate or incomplete personal data we hold about you. - Right
                        to Deletion: You can request to delete your personal data, subject
                        to certain legal conditions. - Right to Withdraw Consent: If you
                        have previously given consent for data processing, you can withdraw
                        it at any time by contacting us at [Your Contact Email].
                        <br />
                        <br />
                        [Include all terms here]
                        <br />
                        2.3 Location Data
                        By using our Website and services, you consent to our collection and use of your location data for the purpose of providing location-based services (e.g., maps, nearby places, etc.). We will use this data only to offer relevant features and improve your experience on the Website.
                        vb <br />
                        <br />
                        3. Use of Personal Data
                        We collect personal data, including location data, for the following purposes:
                        - Providing services (e.g., location-based services)
                        - Customizing user experience
                        - Improving our Website and services
                        - Communicating with you regarding updates
                        We will not use your data for any purposes beyond what is stated in this ToC unless explicitly communicated to you.
                        <br />
                        <br />
                        4. Consent to Use of Data
                        By accepting this Terms and Conditions and granting us access to your location, you:
                        - Consent to the use of your personal data as described in this policy.
                        - Agree to allow us to access your location data for the purpose of providing services such as location-based features.
                        If you do not wish to share your location data, you can opt-out or disable location services in your browser settings.
                        <br />
                        <br />
                        5. Third-Party Services
                        Our Website may contain links or integrations with third-party services (e.g., Google Maps or location-based services) that may collect, store, or share your personal data. These third-party services have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices or content of these third-party services.
                        <br />
                        <br />
                        6. Security
                        We implement reasonable security measures to protect your personal data. However, please note that no system is completely secure, and we cannot guarantee the absolute security of your data.
                        <br />
                        <br />
                        7. Changes to Terms
                        We reserve the right to update or change these Terms and Conditions at any time. If any material changes are made, we will notify you by posting the updated terms on our Website or by other means, such as email. Your continued use of the Website after such changes signifies your acceptance of the updated Terms.
                        <br />
                        <br />
                        8. Contact Us
                        If you have any questions or concerns about these Terms and Conditions or your data, please contact us at:
                        - Email: [Your Contact Email]
                        - Address: [Your Company Address]
                        <br />
                        <br />
                        9. Governing Law and Dispute Resolution
                        These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes relating to these Terms and Conditions will be resolved through binding arbitration in
                        [Your Location], India.

                    </p>
                </div>

                {/* Checkbox and Button */}
                <div className="flex items-center gap-4">
                    <input
                        type="checkbox"
                        id="termsCheckbox"
                        className="w-5 h-5"
                        disabled={!isRead} // Disable until the user scrolls to the bottom
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label
                        htmlFor="termsCheckbox"
                        className={`text-sm ${isRead ? "text-white" : "text-gray-500"
                            }`}
                    >
                        I have read and agree to the Terms and Conditions.
                    </label>
                </div>

                <button
                    className={`mt-4 w-full py-2 rounded ${isChecked
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-gray-500 text-gray-300 cursor-not-allowed"
                        }`}
                    disabled={!isChecked} // Disable until the checkbox is checked
                    onClick={handleAgree}
                >
                    Agree
                </button>
            </div>
        </div>
    );
}
