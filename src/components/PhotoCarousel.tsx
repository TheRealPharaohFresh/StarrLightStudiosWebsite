import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import babygirls from "../assets/photos/babygirls.jpg";
import leila from "../assets/photos/leila.jpg";
import maryjane from "../assets/photos/maryjane.jpg";
import neko from "../assets/photos/neko.jpg";
import chasen from "../assets/photos/chasen.jpeg";

const photos = [
  babygirls,
  leila,
  maryjane,
  neko,
];

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div
      className="w-full"
      style={{
        height: "900px", // Adjust for hero height, or use "100vh" for fullscreen
        overflow: "hidden",
      }}
    >
      <Slider {...settings}>
        {photos.map((src, index) => (
          <div
            key={index}
            className="flex justify-center items-center"
            style={{ height: "100%" }} // Full height of the hero section
          >
            <img
              src={src}
              alt={`Slide ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Fill hero, no black bars
              }}
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;


