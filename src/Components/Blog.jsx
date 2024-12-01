import React, { useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";


const Blog = () => {
  const carouselRef = useRef(null); // Create a ref for the carousel

  const blogs = [
    {
      date: "07 Sep 2024",
      title: "How to Check Air Quality in Your Area? A complete guide!",
      image: "https://www.aqi.in/blog/wp-content/uploads/2024/09/how-to-check-air-quality-850x600.webp",
    },
    {
      date: "26 Aug 2024",
      title: "Air Pollution and Inequality: The Heavy Burden on Low-Income Communities",
      image: "https://static.toiimg.com/thumb/msid-105025095,width-1070,height-580,imgsize-67826,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    },
    {
      date: "26 Aug 2024",
      title: "Air Pollution and Inequality: The Heavy Burden on Low-Income Communities",
      image: "https://www.aqi.in/blog/wp-content/uploads/2024/08/air-pollution-and-inequality-in-communities.webp",
    },
    {
      date: "08 Aug 2024",
      title: "Our Diet and Nutrition: How Air Pollution Affects Our Food?",
      image: "https://www.aqi.in/blog/wp-content/uploads/2024/08/air-pollution-affects-our-food.webp",
    },
  ];

  const items = blogs.map((blog, index) => (
    <div
      className="p-4 max-w-xs ml-12 h-[20rem] mb-8 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 overflow-hidden"
      key={index}
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-40 object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
      />
      <div className="p-4">
        <p className="text-sm text-gray-50">{blog.date}</p>
        <h3 className="text-lg font-semibold mt-2 text-gray-50">{blog.title}</h3>
      </div>
    </div>
  ));

  return (
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="py-16  h-[45rem] ">
      <h1 className="text-5xl font-bold text-[#289BD1] text-center">
        Recent Blogs
      </h1>
      <p className="text-center text-white mt-6 max-w-2xl mx-auto">
        Here Are Some Resources That You Can Go Through To Find Out More About Air Quality & Pollution.
      </p>

      <div className="relative mt-12 max-w-7xl  mx-auto">
        <div className="relative overflow-hidden  rounded-lg shadow-lg">
          <AliceCarousel
            ref={carouselRef} // Reference the carousel here
            mouseTracking
            items={items}
            responsive={{
              0: { items: 1 },
              1024: { items: 3 },
            }}
            controlsStrategy="responsive"
            infinite
            disableDotsControls
            disableButtonsControls
            animationDuration={800}
          />
        </div>

        {/* Previous Button */}
        <button
          className="absolute  left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:bg-blue-800 transition duration-300"
          onClick={() => {
            if (carouselRef.current) {
              carouselRef.current.slidePrev(); // Use slidePrev() method
            }
          }}
        >
          &#8592;
        </button>

        {/* Next Button */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:bg-blue-800 transition duration-300"
          onClick={() => {
            if (carouselRef.current) {
              carouselRef.current.slideNext(); // Use slideNext() method
            }
          }}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Blog;
