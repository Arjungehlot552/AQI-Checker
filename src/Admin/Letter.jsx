import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_TEMPLATE_ID =
  process.env.EMAILJS_TEMPLATE_ID || "service_8ovesi4";
const EMAILJS_PUBLIC_KEY =
  process.env.EMAILJS_PUBLIC_KEY || "wPt866htdnLLUnL6G";
const EMAILJS_SERVICE_KEY =
  process.env.EMAILJS_SERVICE_KEY || "template_kc6c39e";

const AdminLetter = () => {
  const [industryName, setIndustryName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [date, setDate] = useState("");
  const [department, setDepartment] = useState("");
  const [issueDetails, setIssueDetails] = useState("");
  const [actionsRequired, setActionsRequired] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [letter, setLetter] = useState("");

  const industries = [
    { name: "Industry A", email: "industryA@example.com" },
    { name: "Industry B", email: "industryB@example.com" },
    { name: "Industry C", email: "industryC@example.com" },
  ];
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    return (
      <div className="text-white text-center text-3xl font-bold">
        You are not authorized to access this page
      </div>
    );
  }
  const handleGenerateLetter = () => {
    const generatedLetter = `
      ${date}

      To,
      The Management of ${industryName},
      ${address},
      ${city}, ${postalCode}

      Subject: Urgent Action Required to Reduce Gas Emissions Impacting AQI Levels

      Dear Sir/Madam,

      We, the administration of [City/Region], are writing to you regarding a matter of serious concern related to the air quality in our region. It has been observed that the emissions from your industry, specifically gases such as ${issueDetails}, are significantly contributing to the increasing Air Quality Index (AQI) levels. This has caused a deterioration in environmental conditions and a rise in health risks for the general public.

      As part of our commitment to ensuring a clean and safe environment for all residents, we are instructing you to take immediate action to reduce these harmful emissions. The following steps must be implemented without delay: 

      ${actionsRequired}

      Please be advised that should your industry fail to comply with this directive, the government will be compelled to take further action, including the imposition of fines, restrictions, and possible legal measures to ensure the protection of public health and the environment.

      We trust that you will give this matter the urgent attention it deserves and take the necessary steps to mitigate the emissions at your earliest convenience. We expect a report on the actions taken within [X days/weeks] of receiving this notice.

      Failure to do so will result in strict governmental measures.

      Sincerely,
      [Your Name]
      [Your Title]
      [Government Department]
      [Contact Information]
    `;
    setLetter(generatedLetter);
  };

  const handleSendLetter = () => {
    const selectedIndustryData = industries.find(
      (industry) => industry.name === selectedIndustry
    );

    if (selectedIndustryData) {
      alert(
        `Letter sent to ${selectedIndustryData.name} at ${selectedIndustryData.email} \n\n${letter}`
      );
      emailjs.send(
        EMAILJS_SERVICE_KEY,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: "Admin Letter Management",
          from_email: "arjungehlot552@gmail.com",
          to_name: selectedIndustryData.name,
          to_email: "keshav.iesbpl@gmail.com",
          subject:
            "Urgent Action Required to Reduce Gas Emissions Impacting AQI Levels",
          message: letter,
        },
        EMAILJS_PUBLIC_KEY
      );
    } else {
      alert("Please select a valid industry to send the letter.");
    }
  };

  return (
    <div className="p-6 max-w-4xl  mx-auto border mt-20 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl  text-white text-center mb-4">
        Administration Letter Management
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerateLetter();
        }}
        className="space-y-4 "
      >
        {[
          {
            label: "Industry Name",
            value: industryName,
            setter: setIndustryName,
          },
          { label: "Address", value: address, setter: setAddress },
          { label: "City", value: city, setter: setCity },
          { label: "Postal Code", value: postalCode, setter: setPostalCode },
          { label: "Date", value: date, setter: setDate, type: "date" },
          {
            label: "Department Name",
            value: department,
            setter: setDepartment,
          },
        ].map(({ label, value, setter, type = "text" }) => (
          <div key={label}>
            <label className="block text-gray-50 my-3 font-medium">
              {label}:
            </label>
            <input
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              placeholder={`Enter ${label}`}
              required
              className="w-full p-2 border text-white rounded-lg bg-transparent "
            />
          </div>
        ))}

        {[
          "Gases Emitted Contributing to AQI",
          "Actions Required to Mitigate Emissions",
        ].map((label, idx) => (
          <div key={idx}>
            <label className="block text-gray-50 my-3 font-medium">
              {label}:
            </label>
            <textarea
              value={idx === 0 ? issueDetails : actionsRequired}
              onChange={(e) =>
                idx === 0
                  ? setIssueDetails(e.target.value)
                  : setActionsRequired(e.target.value)
              }
              placeholder={`Enter ${label}`}
              required
              className="w-full p-2 text-white border rounded-lg bg-transparent  "
            ></textarea>
          </div>
        ))}

        <button
          type="submit"
          className="w-40 bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600"
        >
          Generate Letter
        </button>
      </form>

      {letter && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Generated Letter:
          </h2>
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            className="w-full p-2 border text-white rounded-lg bg-transparent  "
            rows="10"
          ></textarea>

          <div className="mt-4">
            <label className="block text-gray-50 mb-3 font-medium">
              Select Industry to Send:
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full p-2 border text-white rounded-lg bg-transparent "
            >
              <option className="text-gray-500" value="">
                Select Industry
              </option>
              {industries.map((industry, index) => (
                <option
                  className="text-black"
                  key={index}
                  value={industry.name}
                >
                  {industry.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSendLetter}
              className="w-40 bg-green-500 text-white font-medium py-2 rounded-lg mt-4 hover:bg-green-600"
            >
              Send Letter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLetter;
