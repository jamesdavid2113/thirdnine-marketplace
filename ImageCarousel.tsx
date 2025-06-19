import { useState, useEffect } from 'react';
interface CarouselImage {
  src: string;
  alt: string;
}
interface ImageCarouselProps {
  images: CarouselImage[];
  autoRotateInterval?: number;
}
const ImageCarousel = ({
  images,
  autoRotateInterval = 5000
}: ImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
    }, autoRotateInterval);
    return () => clearInterval(interval);
  }, [images.length, autoRotateInterval]);

  // Manual navigation handlers
  const goToNext = () => {
    setCurrentImageIndex(prevIndex => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
  };
  const goToPrevious = () => {
    setCurrentImageIndex(prevIndex => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
  };
  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };
  if (!images || images.length === 0) {
    return <div className="w-full max-w-lg h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>;
  }
  return <div className="relative w-full">
      {/* Main Image Container - Made larger */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
        {images.map((image, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img src={image.src} alt={image.alt} onError={e => {
          const target = e.target as HTMLImageElement;
          target.src = '/placeholder.svg';
          target.onerror = null;
        }} className="w-full h-full object-scale-down" />
          </div>)}

        {/* Navigation Arrows - Only show if more than 1 image */}
        {images.length > 1 && <>
            <button onClick={goToPrevious} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110" aria-label="Previous image">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button onClick={goToNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110" aria-label="Next image">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>}

        {/* Progress Indicator */}
        {images.length > 1 && <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`w-4 h-4 rounded-full transition-all duration-200 ${index === currentImageIndex ? 'bg-white shadow-lg' : 'bg-white/50 hover:bg-white/75'}`} aria-label={`Go to image ${index + 1}`} />)}
          </div>}
      </div>

      {/* Image Counter */}
      {images.length > 1 && <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded text-base">
          {currentImageIndex + 1} / {images.length}
        </div>}
    </div>;
};
export default ImageCarousel;