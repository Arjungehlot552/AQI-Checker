import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import the required modules from Swiper
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Correct path

const MediaCoverage = () => {
    const mediaLogos = [
      
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxrVgFAjjg3lYrzZSnA4AgN7LiqVOsiDVkODPUaskpob2POfdIp8EV6R2NO0CWIzhrh-k&usqp=CAU", alt: "The Times of India" },
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxrVgFAjjg3lYrzZSnA4AgN7LiqVOsiDVkODPUaskpob2POfdIp8EV6R2NO0CWIzhrh-k&usqp=CAU", alt: "The Times of India" },
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Pj5UhNC5Hc7S6NObb1d8QaA6OiHicSRdmg&s", alt: "Business World" },
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa-NxtlXAXaaZenc2jnJ2g2RNujmJIyH_D0w&s", alt: "Indian express" },
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa-NxtlXAXaaZenc2jnJ2g2RNujmJIyH_D0w&s", alt: "Indian express" },
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxrVgFAjjg3lYrzZSnA4AgN7LiqVOsiDVkODPUaskpob2POfdIp8EV6R2NO0CWIzhrh-k&usqp=CAU", alt: "The Times of India" },
    ];

    return (
        <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className=" py-10 px-4 h-[20rem]">
            <h2 className="text-4xl font-bold text-[#289BD1] text-center mb-10">Media Coverage</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true} // Activate navigation
                pagination={{ clickable: true }} // Activate pagination
                autoplay={{ delay: 3000 }} // Activate autoplay
                modules={[Navigation, Pagination, Autoplay]} // Register modules here
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                }}
                className="mySwiper"
            >
                {mediaLogos.map((logo, index) => (
                    <SwiperSlide key={index}>
                        <div  className="flex justify-center items-center mt-11 mb-[4.5rem] bg-gray-800 rounded-lg shadow-lg p-6">
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="h-24 w-auto object-contain"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MediaCoverage;
