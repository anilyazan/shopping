// components/ImageGallery.js

import React, { useState } from "react";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <img
          src={selectedImage}
          alt="Selected Image"
          style={{ maxWidth: "400px", maxHeight: "800px", margin: "5px" }}
        />
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              style={{
                cursor: "pointer",
                maxWidth: "100px",
                maxHeight: "100px",
                margin: "5px",
              }}
              onClick={() => handleThumbnailClick(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
