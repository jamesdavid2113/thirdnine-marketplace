import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProductsByCategory } from '@/hooks/useProductsByCategory';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturedProductsSlider = () => {
  const { t } = useLanguage();
  const { products, loading } = useProductsByCategory(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filter to get featured products (limit to 8-10 items)
  const featuredProducts = products.slice(0, 10);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying || featuredProducts.length <= 4) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Math.max(1, featuredProducts.length - 3));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredProducts.length]);

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % Math.max(1, featuredProducts.length - 3));
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? Math.max(0, featuredProducts.length - 4) : prev - 1);
  };

  if (loading || featuredProducts.length === 0) {
    return null;
  }

  return (
    <div 
      className="bg-white border-b border-gray-200 py-4"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">{t('featured.title')}</h2>
          <Link 
            to="/browse" 
            className="text-sm text-primary hover:text-primary/80 font-medium"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {t('featured.view.all')} →
          </Link>
        </div>
        
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md rounded-full h-8 w-8 p-0"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md rounded-full h-8 w-8 p-0"
            disabled={currentIndex >= featuredProducts.length - 4}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Products Slider */}
          <div className="overflow-hidden mx-8">
            <div 
              className="flex transition-transform duration-300 ease-in-out gap-4"
              style={{ transform: `translateX(-${currentIndex * 25}%)` }}
            >
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="flex-shrink-0 w-1/4 group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.images[0] || '/placeholder.svg'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm text-gray-900 line-clamp-1 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-gray-900">
                          €{product.price.toFixed(2)}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize">
                          {product.condition}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-3 gap-2">
            {Array.from({ length: Math.max(1, featuredProducts.length - 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsSlider;
