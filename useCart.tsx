
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

interface CartItem {
  id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    brand: string;
    condition: string;
    size: string | null;
    price: number;
    images: string[];
    seller?: {
      name: string;
      profile_picture: string | null;
    };
  };
}

interface UseCartReturn {
  cartItems: CartItem[];
  loading: boolean;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, newQuantity: number) => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
  refetch: () => void;
}

export const useCart = (): UseCartReturn => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      if (!user) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      // First get cart items
      const { data: cartData, error: cartError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (cartError) throw cartError;

      if (!cartData || cartData.length === 0) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      // Get product IDs from cart items
      const productIds = cartData.map(item => item.product_id);

      // Fetch products separately
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .in('id', productIds);

      if (productsError) throw productsError;

      // Get seller IDs
      const sellerIds = [...new Set(productsData?.map(p => p.seller_id) || [])];

      // Fetch seller profiles
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, name, profile_picture')
        .in('id', sellerIds);

      // Combine cart items with product data
      const combinedCartItems = cartData.map(cartItem => {
        const product = productsData?.find(p => p.id === cartItem.product_id);
        const seller = profilesData?.find(p => p.id === product?.seller_id);

        return {
          id: cartItem.id,
          quantity: cartItem.quantity,
          products: {
            id: product?.id || '',
            name: product?.name || '',
            brand: product?.brand || '',
            condition: product?.condition || '',
            size: product?.size,
            price: product?.price || 0,
            images: product?.images || [],
            seller: seller ? {
              name: seller.name,
              profile_picture: seller.profile_picture
            } : undefined
          }
        };
      });
      
      setCartItems(combinedCartItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      if (!user) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to add items to your cart.",
          variant: "destructive",
        });
        return;
      }

      // Check if item already in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

      if (existingItem) {
        toast({
          title: "Item already in cart",
          description: "This item is already in your cart.",
        });
        return;
      }

      // Add to cart
      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          product_id: productId,
          quantity: 1
        });

      if (error) throw error;
      
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart.",
      });
      
      // Refresh cart items
      fetchCartItems();
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (error) throw error;
      
      // Remove from local state
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart.",
      });
      
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', cartItemId);

      if (error) throw error;
      
      // Update local state
      setCartItems(prev => prev.map(item => 
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      ));
      
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity.",
        variant: "destructive",
      });
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.products?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  return {
    cartItems,
    loading,
    removeFromCart,
    updateQuantity,
    addToCart,
    getCartTotal,
    getCartCount,
    refetch: fetchCartItems
  };
};
