
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
  showStatus?: boolean;
}

const ProductCard = ({ product, showStatus = false }: ProductCardProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: t('cart.signin'),
        description: t('cart.signin'),
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    // Prevent adding own products to cart
    if (user.id === product.sellerId) {
      toast({
        title: t('product.own.product'),
        description: t('product.own.product'),
        variant: "destructive",
      });
      return;
    }

    await addToCart(product.id);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // Only use real images
  const primaryImage = (product.images && product.images.length > 0) ? product.images[0] : '/placeholder.svg';
  
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group h-[420px] flex flex-col">
        <div className="relative aspect-square overflow-hidden flex-shrink-0">
          <img 
            src={primaryImage} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          
          {/* Status Badge for profile view */}
          {showStatus && (
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                product.status === 'active' ? 'bg-green-100 text-green-800 border border-green-200' :
                product.status === 'sold' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                'bg-gray-100 text-gray-800 border border-gray-200'
              }`}>
                {product.status?.toUpperCase()}
              </span>
            </div>
          )}
          
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute right-3 top-3 bg-red-500 px-2 py-1 text-xs font-bold text-white rounded-full">
              -{discountPercent}% OFF
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
              {product.category}
            </span>
          </div>
          
          {/* Like Button */}
          <div className="absolute top-3 right-3 rounded-full bg-white/90 p-1.5 shadow-sm">
            <button onClick={handleLikeClick}>
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
          </div>
          
          {/* Add to Cart Button - appears on hover */}
          {!showStatus && (
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={!user || user.id === product.sellerId}
                className="rounded-full bg-green-600 hover:bg-green-700"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            {/* Product Title - 2 lines max */}
            <p className="text-sm font-semibold line-clamp-2 mb-2 min-h-[2.5rem] leading-tight">{product.name}</p>
            <p className="text-xs text-muted-foreground font-medium mb-2">{product.brand}</p>
              
            {/* Condition and Size */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full font-medium capitalize">
                {product.condition}
              </span>
              {product.size && (
                <span className="text-xs text-muted-foreground">{t('product.size')} {product.size}</span>
              )}
            </div>
          </div>
          
          {/* Price Section with Euro Currency */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                €{product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">
                  €{product.originalPrice!.toFixed(2)}
                </span>
              )}
            </div>
            {hasDiscount && (
              <div className="text-xs text-green-600 font-medium">
                {t('product.save.amount')} €{(product.originalPrice! - product.price).toFixed(2)}
              </div>
            )}
          </div>

          {/* Seller Info */}
          <div className="text-xs text-muted-foreground mb-3">
            <div className="truncate">{t('product.seller')} {product.sellerName}</div>
            <div className="truncate">{product.location}</div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs mb-3">
            <span className="text-yellow-500">★</span>
            <span>{product.sellerRating?.toFixed(1) || '4.5'}</span>
          </div>

          {/* Action Button - only show for non-status cards */}
          {!showStatus && (
            <Button
              onClick={handleAddToCart}
              disabled={!user || user.id === product.sellerId}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {t('product.add.cart')}
            </Button>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
