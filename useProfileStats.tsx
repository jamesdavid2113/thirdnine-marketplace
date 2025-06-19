
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProfileStats {
  totalListings: number;
  activeListings: number;
  soldListings: number;
  totalViews: number;
  totalEarnings: number;
  totalSpent: number;
  memberSince: string | null;
  responseRate: number;
  avgRating: number;
}

export const useProfileStats = (userId: string | undefined) => {
  const [stats, setStats] = useState<ProfileStats>({
    totalListings: 0,
    activeListings: 0,
    soldListings: 0,
    totalViews: 0,
    totalEarnings: 0,
    totalSpent: 0,
    memberSince: null,
    responseRate: 0,
    avgRating: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    if (!userId) {
      setStats({
        totalListings: 0,
        activeListings: 0,
        soldListings: 0,
        totalViews: 0,
        totalEarnings: 0,
        totalSpent: 0,
        memberSince: null,
        responseRate: 0,
        avgRating: 0
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch ONLY real user products (no dummy/placeholder data)
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', userId)
        .not('name', 'ilike', '%placeholder%')
        .not('name', 'ilike', '%demo%')
        .not('name', 'ilike', '%test%')
        .not('name', 'ilike', '%sample%')
        .not('name', 'ilike', '%dummy%')
        .not('name', 'ilike', '%example%');

      if (productsError) throw productsError;

      // Fetch user profile for member since date
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('created_at')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      // Calculate real statistics from actual user data
      const realProducts = (products || []).filter(p => 
        p.price && parseFloat(p.price.toString()) > 0 && // Valid price
        p.name && p.name.trim().length > 0 && // Valid name
        p.brand && p.brand.trim().length > 0 // Valid brand
      );

      const totalListings = realProducts.length;
      const activeListings = realProducts.filter(p => p.status === 'active').length;
      const soldListings = realProducts.filter(p => p.status === 'sold').length;
      const totalViews = realProducts.reduce((sum, p) => sum + (p.views_count || 0), 0);
      const totalEarnings = realProducts
        .filter(p => p.status === 'sold')
        .reduce((sum, p) => sum + (parseFloat(p.price.toString()) || 0), 0);

      // Fetch real orders as buyer (no dummy data)
      const { data: orders } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('buyer_id', userId)
        .eq('status', 'delivered')
        .not('total_amount', 'is', null);

      const totalSpent = (orders || []).reduce((sum, order) => sum + (parseFloat(order.total_amount.toString()) || 0), 0);

      setStats({
        totalListings,
        activeListings,
        soldListings,
        totalViews,
        totalEarnings,
        totalSpent,
        memberSince: profile?.created_at,
        responseRate: totalListings > 0 ? Math.floor(Math.random() * 20) + 80 : 0, // Placeholder
        avgRating: totalListings > 0 ? Math.random() * 1 + 4 : 0 // Placeholder
      });

    } catch (error) {
      console.error('Error fetching profile stats:', error);
      // Set zero stats on error
      setStats({
        totalListings: 0,
        activeListings: 0,
        soldListings: 0,
        totalViews: 0,
        totalEarnings: 0,
        totalSpent: 0,
        memberSince: null,
        responseRate: 0,
        avgRating: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [userId]);

  return { stats, loading, refetch: fetchStats };
};
