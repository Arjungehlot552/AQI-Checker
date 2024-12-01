import React from "react";

const doctorData = [
    {
      id: 1,
      name: "Dr. Anjali Sharma",
      education: "MBBS, MD (Cardiology)",
      location: "Delhi, India",
      contact: "+91 xxxxxxxxxx",
      service: "Free Service",
      image:
        "https://static.vecteezy.com/system/resources/previews/035/681/291/non_2x/ai-generated-female-doctor-isolated-on-transparent-background-free-png.png",
    },
    {
      id: 2,
      name: "Dr. Ravi Patel",
      education: "MBBS, MS (Orthopedics)",
      location: "Mumbai, India",
      contact: "+91 xxxxxxxxxx",
      service: "Chargeable Service",
      image:
        "https://as1.ftcdn.net/v2/jpg/06/66/97/14/1000_F_666971417_zy20oiX6VRkKmiJzJpl0aNwb17ZP1nKP.jpg",
    },
    {
      id: 3,
      name: "Dr. Priya Kapoor",
      education: "MBBS, MD (Pediatrics)",
      location: "Bangalore, India",
      contact: "+91 xxxxxxxxxx",
      service: "Free Service",
      image:
        "https://static.vecteezy.com/system/resources/previews/041/409/059/non_2x/ai-generated-a-female-doctor-with-a-stethoscope-isolated-on-transparent-background-free-png.png",
    },
    {
      id: 4,
      name: "Dr. Anil Verma",
      education: "MBBS, MD (Dermatology)",
      location: "Hyderabad, India",
      contact: "+91 xxxxxxxxxx",
      service: "Chargeable Service",
      image:
        "https://t4.ftcdn.net/jpg/05/94/46/77/360_F_594467718_8VcaoxOOfEimkY0BDrF7jZLwp0HmdVZH.jpg",
    },
    {
      id: 5,
      name: "Dr. Neha Singh",
      education: "BDS, MDS (Dentistry)",
      location: "Chennai, India",
      contact: "+91 xxxxxxxxxx",
      service: "Free Service",
      image:
        "https://i.pinimg.com/originals/c0/84/37/c08437302143e0564efdef7124d0cb04.png",
    },
    {
      id: 6,
      name: "Dr. Manoj Desai",
      education: "MBBS, MD (Neurology)",
      location: "Ahmedabad, India",
      contact: "+91 xxxxxxxxxx",
      service: "Chargeable Service",
      image:
        "https://img.freepik.com/premium-photo/portrait-confident-male-doctor-standing-with-arms-crossed-hospital-corridor-ai-generated_632984-111.jpg",
    },
  ];
  

export default function Doctor() {
    return (
        <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="min-h-screen  p-8">
            {/* Page Heading */}
            <h1 className="text-center text-4xl font-extrabold text-white mb-4">
                Our Trusted Medical Professionals
            </h1>
            <p className="text-center text-lg text-white italic mb-12">
                "Dedicated to your health and committed to your well-being."
            </p>
            {/* Doctor Cards */}
            <div className="grid gap-8 cursor-pointer md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {doctorData.map((doctor) => (
                    <div
                        key={doctor.id}
                        className="bg-gray-800 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transform transition duration-300 hover:-translate-y-2"
                    >
                        <div className="relative">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-56 object-contain"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 hover:opacity-60 transition-opacity duration-300"></div>
                            <div className="absolute bottom-4 left-4 text-white font-bold text-xl">
                                {doctor.name}
                            </div>
                        </div>
                        <div className="p-6">
                            <p className=" font-semibold text-white text-md mb-1">
                                {doctor.education}
                            </p>
                            <p className="text-white text-sm mb-2  flex items-center">
                                <i className="fas fa-map-marker-alt text-indigo-500 mr-1"></i>
                                {doctor.location}
                            </p>
                            <p className="text-white mb-4 flex items-center">
                                <i className="fas fa-phone-alt text-green-500 mr-1"></i>
                                <a
                                    href={`tel:${doctor.contact}`}
                                    className="text-white hover:underline font-medium"
                                >
                                    {doctor.contact}
                                </a>
                            </p>
                            <div
                                className={`px-4 py-2 rounded-lg text-center font-semibold text-sm ${doctor.service === "Free Service"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                            >
                                {doctor.service}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
