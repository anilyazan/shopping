// components/Options.js

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
          <p className="text-lg font-semibold">{attribute.name}</p>
          <div className="flex flex-wrap gap-2">
            {attribute.name === "Renk"
              ? attribute.values.map((value, valueIndex) => (
                  <button
                    key={valueIndex}
                    className={`px-4 py-2 border rounded-md ${
                      selectedColor === value ? "bg-gray-300" : ""
                    }`}
                    onClick={() => handleColorChange(value)}
                    style={{
                      marginRight: "0.5rem",
                      color: "black",
                      padding: "8px 50px",
                      borderRadius: "4px",
                      backgroundColor: selectedColor === value ? "orange" : "white",
                    }}
                  >
                    {value}
                  </button>
                ))
              : attribute.values.map((value, valueIndex) => (
                  <button
                    key={valueIndex}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === value
                        ? "bg-gray-300"
                        : disabledSizes.includes(value)
                        ? "bg-gray-200 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() =>
                      !disabledSizes.includes(value) && handleSizeChange(value)
                    }
                    disabled={disabledSizes.includes(value)}
                    style={{
                      marginRight: "0.5rem",
                      color: "black",
                      padding: "8px 50px",
                      borderRadius: "4px",
                      backgroundColor: selectedSize === value ? "orange" : "white",
                    }}
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
