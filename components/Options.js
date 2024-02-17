// components/Options.js

export default function Options({ selectableAttributes, selectedColor, selectedSize, onColorChange, onSizeChange }) {
    const handleColorChange = (color) => {
      onColorChange(color);
    };
  
    const handleSizeChange = (size) => {
      onSizeChange(size);
    };
  
    return (
      <div className="flex flex-col gap-4">
        {selectableAttributes.map((attribute, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold">{attribute.name}</h3>
            <div className="flex flex-wrap gap-2">
              {attribute.name === 'Renk' ? (
                attribute.values.map((value, valueIndex) => (
                  <button
                    key={valueIndex}
                    className={`px-4 py-2 border rounded-md ${selectedColor === value ? 'bg-gray-300' : ''}`}
                    onClick={() => handleColorChange(value)}
                  >
                    {value}
                  </button>
                ))
              ) : (
                attribute.values.map((value, valueIndex) => (
                  <button
                    key={valueIndex}
                    className={`px-4 py-2 border rounded-md ${selectedSize === value ? 'bg-gray-300' : ''}`}
                    onClick={() => handleSizeChange(value)}
                  >
                    {value}
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  