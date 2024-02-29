// components/QuantitySelector.js

import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
const QuantitySelector = ({ baremList, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(
    baremList.length > 0 ? baremList[0].minimumQuantity.toString() : "0"
  );
  const [price, setPrice] = useState(
    baremList.length > 0 ? baremList[0].price : 0
  );
  useEffect(() => {
    onQuantityChange?.(quantity);
  }, [quantity]);
  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value.toString());

    // Miktarına göre fiyatı güncelle
    const selectedBarem = baremList.find(
      (barem) =>
        value >= barem.minimumQuantity && value <= barem.maximumQuantity
    );
    if (selectedBarem) {
      setPrice(selectedBarem.price);
    }
  };

  return (
    <div className="quantity-selector">
      <label htmlFor="quantity" className="block mb-2">
        Adet:{" "}
      </label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={handleChange}
        min={
          baremList.length > 0 ? baremList[0].minimumQuantity.toString() : "0"
        }
        className="w-full p-2 mb-2 border rounded"
      />
      <p className="mb-2">Fiyat: {price.toFixed(2)} TL</p>
    </div>
  );
};

export default QuantitySelector;
