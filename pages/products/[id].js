// pages/products/[id].js

import { useState } from "react";
import ImageGallery from "../../components/ImageGallery";
import Options from "../../components/Options";
import QuantitySelector from "../../components/QuantitySelector";

export default function ProductDetailPage({ product }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Renk seçildiğinde
  const handleColorChange = (color) => {
    setSelectedColor(color);
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
      `Ürün ID: ${product.id}, Renk: ${selectedColor}, Beden: ${selectedSize}, Adet: ${quantity}`
    );
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <ImageGallery images={product.images} />
      </div>
      <div className="flex-1">
        <h1>{product.productTitle}</h1>
        <Options
          selectableAttributes={product.selectableAttributes}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          onColorChange={handleColorChange}
          onSizeChange={handleSizeChange}
          product={product}
        />
        <QuantitySelector
          quantity={quantity}
          baremList={product.baremList}
          onQuantityChange={handleQuantityChange}
        />
        <button
          onClick={handleAddToCart}
          disabled={!selectedColor || !selectedSize || quantity < 1}
          style={{ backgroundColor: '#FFA500', color: 'white', fontWeight: 'bold', padding: '8px 16px', borderRadius: '4px' }}
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}
