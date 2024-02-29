// components/Options.js

import "tailwindcss/tailwind.css";
export default function Options({
  selectableAttributes,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
  product,
}) {
  // seçilen rengin varyantlarını filtrele
  const filteredVariants = selectedColor
    ? product.productVariants.filter((variant) =>
        variant.attributes.find(
          (attr) => attr.name === "Renk" && attr.value === selectedColor
        )
      )
    : product.productVariants;

  // Renk seçildiyse, seçilebilir bedenleri bul
  const availableSizes = filteredVariants.reduce((acc, curr) => {
    const sizeAttr = curr.attributes.find((attr) => attr.name === "Beden");
    if (sizeAttr && !acc.includes(sizeAttr.value)) {
      acc.push(sizeAttr.value);
    }
    return acc;
  }, []);

  // Pasif bedenleri bul
  const disabledSizes = selectableAttributes
    .find((attr) => attr.name === "Beden")
    .values.filter((size) => !availableSizes.includes(size));

  const handleColorChange = (color) => {
    onColorChange(color);
    // Renk değiştikçe, seçili olan bedeni sıfırla
    onSizeChange(null);
  };

  const handleSizeChange = (size) => {
    onSizeChange(size);
  };

  return (
    <div className="flex flex-col gap-4">
      {selectableAttributes.map((attribute, index) => (
        <div key={index}>
          <p className="text-md font-semibold">{attribute.name}</p>
          <div className="flex flex-wrap gap-2">
            {attribute.name === "Renk"
              ? attribute.values.map((value, valueIndex) => (
                  <button
                    key={valueIndex}
                    className={`px-8 py-2 border rounded-md ${
                      selectedColor === value
                        ? "bg-orange-300 ring ring-black ring-2"
                        : "bg-white"
                    }`}
                    onClick={() => handleColorChange(value)}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    {value}
                  </button>
                ))
              : attribute.values.map((value, valueIndex) => (
                  <button
                    key={valueIndex}
                    className={`px-6 py-2 border rounded-md ${
                      selectedSize === value
                        ? "bg-orange-300 ring ring-black ring-2"
                        : disabledSizes.includes(value)
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-white"
                    }`}
                    onClick={() =>
                      !disabledSizes.includes(value) && handleSizeChange(value)
                    }
                    disabled={disabledSizes.includes(value)}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    {value}
                  </button>
                ))}
          </div>
        </div>
      ))}
    </div>
  );
}
