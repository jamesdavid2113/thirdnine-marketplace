
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

interface UseProductsByCategoryReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProductsByCategory = (category: string | null = null): UseProductsByCategoryReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First, fetch products without the join
      let productsQuery = supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .not('seller_id', 'is', null)
        .not('name', 'ilike', '%placeholder%')
        .not('name', 'ilike', '%demo%')
        .not('name', 'ilike', '%test%')
        .not('name', 'ilike', '%sample%')
        .not('name', 'ilike', '%dummy%')
        .not('name', 'ilike', '%example%')
        .order('created_at', { ascending: false });

      // Filter by category - supports all 5 sports
      const validCategories = ['golf', 'tennis', 'padel', 'hockey', 'cycling'];
      
      if (category && category !== 'all') {
        if (validCategories.includes(category.toLowerCase())) {
          productsQuery = productsQuery.eq('category', category.toLowerCase());
        } else {
          // Invalid category - return empty
          setProducts([]);
          return;
        }
      } else if (category === 'all') {
        // Only show valid categories
        productsQuery = productsQuery.in('category', validCategories);
      } else {
        // No category specified, show all valid categories
        productsQuery = productsQuery.in('category', validCategories);
      }

      const { data: productsData, error: productsError } = await productsQuery;
      
      if (productsError) throw productsError;
      
      if (!productsData || productsData.length === 0) {
        setProducts([]);
        return;
      }

      // Get unique seller IDs
      const sellerIds = [...new Set(productsData.map(p => p.seller_id))];
      
      // Fetch seller profiles separately
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, name, profile_picture, city')
        .in('id', sellerIds);

      if (profilesError) {
        console.warn('Error fetching profiles:', profilesError);
      }

      // Create a map of profiles for quick lookup
      const profilesMap = new Map();
      if (profilesData) {
        profilesData.forEach(profile => {
          profilesMap.set(profile.id, profile);
        });
      }

      // Enhanced filtering for real products only
      const realProducts = productsData
        .filter(item => 
          item.seller_id && // Must have real seller
          item.images && item.images.length > 0 && // Must have real images
          item.price && parseFloat(item.price.toString()) > 0 && // Must have valid price
          item.name && item.name.trim().length > 0 && // Must have valid name
          item.brand && item.brand.trim().length > 0 && // Must have valid brand
          !item.name.toLowerCase().includes('placeholder') &&
          !item.name.toLowerCase().includes('demo') &&
          !item.name.toLowerCase().includes('test') &&
          !item.name.toLowerCase().includes('sample') &&
          !item.name.toLowerCase().includes('dummy') &&
          !item.name.toLowerCase().includes('example') &&
          // Ensure category is valid
          validCategories.includes(item.category?.toLowerCase())
        )
        .map(item => {
          // Get seller profile from the map
          const sellerProfile = profilesMap.get(item.seller_id);
          
          return {
            id: item.id,
            name: item.name,
            description: item.description || '',
            price: parseFloat(item.price.toString()),
            originalPrice: item.original_price ? parseFloat(item.original_price.toString()) : undefined,
            condition: item.condition as Product['condition'],
            category: item.category as Product['category'],
            subcategory: item.subcategory,
            size: item.size,
            brand: item.brand,
            images: item.images || [],
            sellerId: item.seller_id,
            sellerName: sellerProfile?.name || 'Unknown Seller',
            sellerRating: 4.5, // Default rating
            createdAt: item.created_at,
            location: item.location || sellerProfile?.city || 'Location not specified',
            status: item.status as Product['status']
          };
        });
      
      console.log(`Fetched ${realProducts.length} real products for category: ${category || 'all'}`);
      setProducts(realProducts);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return { products, loading, error, refetch: fetchProducts };
};
