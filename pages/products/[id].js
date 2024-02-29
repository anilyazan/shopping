// pages/products/[id].js

import { useState } from "react";
import ImageGallery from "../../components/ImageGallery";
import Options from "../../components/Options";
import QuantitySelector from "../../components/QuantitySelector";
import { useParams } from "next/navigation";
import "tailwindcss/tailwind.css";

export default function ProductDetailPage({ product }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.productVariants[0]
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { id } = useParams();
  // Renk seçildiğinde
  const handleColorChange = (color) => {
    setSelectedColor(color);
    const newVariant = product.productVariants.find((variant) =>
      variant.attributes.find(
        (attr) => attr.name === "Renk" && attr.value === color
      )
    );
    setSelectedVariant(newVariant);

    // Tüm resimlerin sırasını al
    const allImages = product.productVariants
      .map((variant) => variant.images)
      .flat();

    // Yeni varianta ait resimleri al
    const newVariantImages = newVariant.images;

    // Tüm resimler içinde yeni variant resimlerinin indekslerini bul
    const newVariantImageIndexes = newVariantImages.map((img) =>
      allImages.indexOf(img)
    );

    // İlk yeni resmin indeksini büyük resim olarak seç
    setSelectedImageIndex(newVariantImageIndexes[0]);

    console.log("new variant :", newVariant);
    console.log("selected image index:", newVariantImageIndexes[0]);
  };

  // Beden seçildiğinde
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // Adet seçildiğinde
  const handleQuantityChange = (qty) => {
    setQuantity(qty);
  };

  // Sepete ekle butonuna tıklandığında
  const handleAddToCart = () => {
    // Sepete ekleme işlemi
    console.log(
      `Ürün ID: ${id}, Renk: ${selectedColor}, Beden: ${selectedSize}, Adet: ${quantity}`
    );
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 md:mr-4 mb-4 md:mb-0">
        <ImageGallery images={selectedVariant.images} />
      </div>
      <div className="flex-1">
        <div className="w-full md:w-1/2">
          <h1 className="mb-4 font-bold">{product.productTitle}</h1>
          <Options
            selectableAttributes={product.selectableAttributes}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onColorChange={handleColorChange}
            onSizeChange={handleSizeChange}
            product={product}
          />
          <table className="mt-4 text-sm text-gray-600 border-collapse">
            <thead>
              <tr>
                <th>Adet Aralığı</th>
                <th>Toptan Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {product.baremList.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.minimumQuantity} -{" "}
                    {item.maximumQuantity === 2147483647
                      ? "Üzeri"
                      : item.maximumQuantity}{" "}
                    adet
                  </td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <QuantitySelector
            quantity={quantity}
            baremList={product.baremList}
            onQuantityChange={handleQuantityChange}
          />
          <div className="mt-4 text-sm text-gray-600">
            Kargo Ücreti: Alıcı Öder
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!selectedColor || !selectedSize || quantity < 1}
            className="mt-4 bg-orange-500 text-white font-bold py-2 px-4 rounded"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(
    `http://${context.req.headers.host}/api/products/${id}`
  );
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}
