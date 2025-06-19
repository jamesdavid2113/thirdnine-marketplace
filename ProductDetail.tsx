import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Share2, ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import ProductInfo from "@/components/ProductInfo";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  condition: string;
  category: string;
  subcategory: string;
  size?: string;
  brand: string;
  images: string[];
  seller_id: string;
  location?: string;
  status: string;
  shipping_options?: string[];
  created_at: string;
  views_count?: number;
}

interface Seller {
  id: string;
  name: string;
  email: string;
  profile_picture?: string;
  city?: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch product details
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (productError) {
        console.error('Product fetch error:', productError);
        setError('Product not found');
        return;
      }

      setProduct(productData);

      // Fetch seller information
      const { data: sellerData, error: sellerError } = await supabase
        .from('profiles')
        .select('id, name, profile_picture, city, email')
        .eq('id', productData.seller_id)
        .single();

      if (sellerError) {
        console.warn('Could not fetch seller info:', sellerError);
        setSeller({ id: productData.seller_id, name: 'Unknown Seller', email: '' });
      } else {
        setSeller(sellerData);
      }

      // Increment view count
      try {
        await supabase.rpc('increment_product_views', { product_uuid: id });
      } catch (viewError) {
        console.warn('Could not increment view count:', viewError);
      }

    } catch (err: any) {
      console.error('Error fetching product:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleContactSeller = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    // Open email client with pre-filled subject
    const subject = encodeURIComponent(`Inquiry about ${product.name} - ReSport`);
    const body = encodeURIComponent(`Hi ${seller?.name || 'there'},\n\nI'm interested in your ${product.name} listed on ReSport.\n\nCould you please provide more details?\n\nThanks!`);
    window.location.href = `mailto:${seller?.email}?subject=${subject}&body=${body}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <p className="mt-2 text-muted-foreground">{error || "The product you're looking for doesn't exist or has been removed."}</p>
            <Link to="/browse" className="mt-4 inline-block">
              <Button>Back to Browse</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;
  const isOwnProduct = user && user.id === product.seller_id;

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/browse" className="hover:text-primary">
                Browse
              </Link>
              <span>›</span>
              <Link to={`/browse?category=${product.category}`} className="hover:text-primary capitalize">
                {product.category}
              </Link>
              <span>›</span>
              <span className="text-foreground">{product.name}</span>
            </div>
          </nav>

          <div className="grid gap-8 md:grid-cols-2 mb-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square overflow-hidden rounded-lg bg-secondary/20">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square rounded-md overflow-hidden border-2 ${
                        selectedImageIndex === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <ProductInfo 
                product={product}
                onContactSeller={handleContactSeller}
                currentUser={user}
              />
            </div>
          </div>

          {/* Seller Information */}
          <div className="bg-secondary/30 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-secondary rounded-full overflow-hidden flex items-center justify-center">
                {seller?.profile_picture ? (
                  <img
                    src={seller.profile_picture}
                    alt={seller.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-2xl font-bold text-muted-foreground">
                    {seller?.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold text-lg">{seller?.name || 'Unknown Seller'}</div>
                {seller?.city && (
                  <div className="text-muted-foreground">{seller.city}</div>
                )}
                <div className="text-sm text-muted-foreground mt-1">
                  Member since {new Date(product.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
