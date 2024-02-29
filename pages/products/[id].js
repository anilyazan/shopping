// pages/products/[id].js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ImageGallery from "../../components/ImageGallery";
import Options from "../../components/Options";
import QuantitySelector from "../../components/QuantitySelector";
import "tailwindcss/tailwind.css";
import { useSearchParams } from "next/navigation";

export default function ProductDetailPage({ product }) {
  const router = useRouter();
  const params = useSearchParams();
  const queryColor = params.get("renk") || "Siyah";
  const { id } = router.query;

  const firstVariant = product.productVariants.filter(
    (x) =>
      x.attributes.filter(
        (attr) => attr.name === "Renk" && attr.value === queryColor
      ).length > 0
  )[0];

  const [selectedColor, setSelectedColor] = useState(
    firstVariant.attributes.find((attr) => attr.name === "Renk").value
  );
  const [selectedSize, setSelectedSize] = useState(
    firstVariant.attributes.find((attr) => attr.name === "Beden").value
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(firstVariant);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  // Sayfa yüklendiğinde URL'den seçimleri al ve state'i güncelle
  useEffect(() => {
    const { renk, beden } = router.query;
    if (renk) setSelectedColor(renk);
    if (beden) setSelectedSize(beden);
  }, []);

  // URL'i güncelle
  useEffect(() => {
    if (!id) return;
    const url = `/products/${id}?renk=${selectedColor}&beden=${selectedSize}`;
    router.replace(url, undefined, { shallow: true });
  }, [selectedColor, selectedSize]);

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
