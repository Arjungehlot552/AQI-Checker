import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Pagination } from "swiper/modules";

const AQISwiper = () => {
  const images = [
    { src: "https://t3.ftcdn.net/jpg/09/55/00/30/360_F_955003054_kx1nKIVpY00NyqVS3Yos2mqe3gYT3aaU.jpg", title: "", subtitle: "" },
    { src: "https://www.pmindia.gov.in/wp-content/uploads/2023/06/PM-addresses-meet-on-World-Environment-Day-via-video-message-16.jpg", title: "", subtitle: "" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Anil_Madhav_Dave_and_senior_officers_of_the_Ministry_for_Environment%2C_Forest_and_Climate_Change_with_the_officers_of_2015_batch_of_the_Indian_Forest_Service%2C_in_New_Delhi.jpg", title: "", subtitle: "" },
    { src: "https://delhigreens.org/wp-content/uploads/2020/01/delhi-greens-carbon-neutral-economy.jpg", title: "", subtitle: "" },
    { src: "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202411/673d5c6fb24dc-delhi-air-pollution-govt-offices-move-to-wfh-mode-as-aqi-remains-in-severe-category-205000452-16x9.jpg?size=1200:675", title: "", subtitle: "" },
    { src: "https://i.ytimg.com/vi/JW1jSINTzaw/maxresdefault.jpg", title: "", subtitle: "" },
  ];

  return (
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="relative  lg:mt-20 lg:pt-10 lg:ml-28 h-[80vh] w-[80%] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center flex flex-col justify-center items-center text-white relative"
              style={{ backgroundImage: `url(${item.src})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
              <div className="z-10 text-center p-6 rounded-lg bg-opacity-50">
                <h2 className="text-4xl font-extrabold mb-2 tracking-wide">{item.title}</h2>
                <p className="text-lg font-medium">{item.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AQISwiper;
