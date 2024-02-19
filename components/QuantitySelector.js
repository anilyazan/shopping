// components/QuantitySelector.js

import { useState } from "react";

const QuantitySelector = ({ baremList }) => {
  const [quantity, setQuantity] = useState(
    baremList.length > 0 ? baremList[0].minimumQuantity.toString() : "0"
  );
  const [price, setPrice] = useState(
    baremList.length > 0 ? baremList[0].price : 0
  );

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
      <label htmlFor="quantity">Adet: </label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={handleChange}
        min={
          baremList.length > 0 ? baremList[0].minimumQuantity.toString() : "0"
        }
      />
      <p>Fiyat: {price.toFixed(2)} TL</p>
    </div>
  );
};

export default QuantitySelector;
