// components/ImageGallery.js

import React, { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';
const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  const handleThumbnailClick = (image, index) => {
    setSelectedImage(image);
    setSlideIndex(index);
  };

  const handleSlide = (direction) => {
    if (direction === "left") {
      setSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (direction === "right") {
      setSlideIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex-1">
        <img
          src={selectedImage}
          alt="Selected Image"
          style={{ maxWidth: "400px", maxHeight: "800px", margin: "5px" }}
        />
      </div>
      <div className="flex-1">
        <div
          className="flex overflow-hidden relative"
          style={{ maxWidth: "450px", maxHeight: "200px", margin: "5px" }}
        >
          {slideIndex > 0 && (
            <button
              className="absolute left-0 top-0 bottom-0 my-auto"
              onClick={() => handleSlide("left")}
            >
              {"<"}
            </button>
          )}
          {slideIndex < images.length - 1 && (
            <button
              className="absolute right-0 top-0 bottom-0 my-auto"
              onClick={() => handleSlide("right")}
            >
              {">"}
            </button>
          )}
          <div
            className="flex"
            style={{
              transform: `translateX(-${slideIndex * 105}px)`,
              transition: "transform 0.3s ease",
            }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                style={{
                  cursor: "pointer",
                  width: "100px",
                  height: "100px",
                  margin: "0 5px",
                  objectFit: "cover",
                }}
                onClick={() => handleThumbnailClick(image, index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
