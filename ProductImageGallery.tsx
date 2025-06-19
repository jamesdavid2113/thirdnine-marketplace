
import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-lg bg-secondary/20">
        <img 
          src={images[selectedImage]} 
          alt={productName} 
          className="h-full w-full object-contain"
        />
      </div>
      
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square rounded-md overflow-hidden border-2 ${
                selectedImage === index ? "border-primary" : "border-transparent"
              }`}
            >
              <img src={image} alt={`${productName} ${index + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
