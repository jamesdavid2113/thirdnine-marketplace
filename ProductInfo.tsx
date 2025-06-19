
import { Heart, Share, ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductInfoProps {
  product: any;
  onContactSeller: () => void;
  currentUser: any;
}

const ProductInfo = ({ product, onContactSeller, currentUser }: ProductInfoProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = async () => {
    await addToCart(product.id);
  };

  const isOwnProduct = currentUser && currentUser.id === product.seller_id;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
            {product.condition}
          </span>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <h1 className="mb-2 text-2xl font-bold">{product.name}</h1>
      <p className="mb-4 text-muted-foreground">{product.brand}</p>
      
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">€{product.price}</span>
          {product.original_price && (
            <span className="text-lg line-through text-muted-foreground">€{product.original_price}</span>
          )}
        </div>
        {product.original_price && (
          <p className="mt-1 text-sm text-green-600">
            {t('product.save.amount')} €{(product.original_price - product.price).toFixed(2)} ({Math.round((1 - product.price / product.original_price) * 100)}%)
          </p>
        )}
      </div>
      
      {product.size && (
        <div className="mb-4">
          <p className="mb-2 font-medium">{t('product.size')}</p>
          <div className="inline-block rounded-md bg-secondary/50 px-3 py-1 text-sm">
            {product.size}
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <p className="mb-2 font-medium">{t('product.description')}</p>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
      
      {!isOwnProduct ? (
        <div className="space-y-3">
          <Button 
            size="lg" 
            className="w-full rounded-full bg-green-600 hover:bg-green-700" 
            onClick={handleAddToCart}
            disabled={product.status !== 'active'}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.status !== 'active' ? t('product.not.available') : t('product.add.cart')}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full rounded-full" 
            size="lg"
            onClick={onContactSeller}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {t('product.contact.seller')}
          </Button>
        </div>
      ) : (
        <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center">
          <div className="text-green-800 font-medium flex items-center justify-center space-x-2">
            <span>✅</span>
            <span>{t('product.own.product')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
