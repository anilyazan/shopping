import { useState } from "react";

const QuantitySelector = ({ baremList }) => {
  const [quantity, setQuantity] = useState(baremList.length > 0 ? baremList[0].minimumQuantity : 0);

  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value);
  };

  return (
    <div className="quantity-selector">
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={handleChange}
        min={baremList.length > 0 ? baremList[0].minimumQuantity : 0}
      />
    </div>
  );
};

export default QuantitySelector;
