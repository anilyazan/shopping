// components/ImageGallery.js
const ImageGallery = ({ images }) => {
  console.log(images);
  return (
    <div className="grid grid-cols-4 gap-4">
      {images &&
        images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            className="w-full h-auto"
          />
        ))}
    </div>
  );
};

export default ImageGallery;
