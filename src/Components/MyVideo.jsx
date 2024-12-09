import React, { useEffect } from "react";


const VideoPage = () => {
  useEffect(() => {
    // Automatically play the video when the page is loaded
    const video = document.getElementById("pollution-video");
    if (video) {
      video.play().catch((error) => {
        console.error("Video playback failed:", error);
      });
    }
  }, []);

  return (
    <div
      style={{ backgroundColor: "rgb(5, 8, 22)" }} // Corrected the background color
      className="min-h-screen flex flex-col justify-center items-center p-5"
    >
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-white mb-5 text-center">
        The Impact of Pollution
      </h1>

      {/* Video Section */}
      <div className="max-w-4xl w-full">
        <video
          id="pollution-video"
          className="rounded-2xl shadow-xl" // Corrected shadow class
          width="100%"
          height="auto"
          muted
          loop
          controls={false}
        >
          <source
            src='pollution-effect.mp4'
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Description Section */}
      <div className="mt-10 max-w-3xl text-center text-white">
        <p className="text-lg">
          This video demonstrates the harmful effects of pollution on our
          environment and health. Watch and understand the importance of reducing
          pollution to protect our planet and future generations.
        </p>
      </div>
    </div>
  );
};

export default VideoPage;
