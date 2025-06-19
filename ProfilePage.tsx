
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { Package, ShoppingBag, User } from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import OrdersTab from "@/components/profile/OrdersTab";
import EditableListingsTab from "@/components/profile/EditableListingsTab";
import StatCard from "@/components/profile/StatCard";
import { useProfileStats } from "@/hooks/useProfileStats";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const ProfilePage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { stats, loading, refetch } = useProfileStats(user?.id);
  const [orders, setOrders] = useState([]);
  const [listings, setListings] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Fetch real user orders and listings
  const fetchUserData = async () => {
    if (!user?.id) {
      setDataLoading(false);
      return;
    }

    try {
      setDataLoading(true);

      // Fetch real orders for the user
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          id,
          total_amount,
          status,
          created_at,
          product_id,
          seller_id,
          products (
            name,
            price,
            images,
            brand
          )
        `)
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
      }

      // Fetch real listings for the user
      const { data: listingsData, error: listingsError } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (listingsError) {
        console.error('Error fetching listings:', listingsError);
      }

      // Get unique seller IDs from orders
      const sellerIds = [...new Set((ordersData || []).map(order => order.seller_id))];
      
      // Fetch seller profiles separately if we have orders
      let profilesData = [];
      if (sellerIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', sellerIds);

        if (profilesError) {
          console.warn('Error fetching seller profiles:', profilesError);
        } else {
          profilesData = profiles || [];
        }
      }

      // Create a map of profiles for quick lookup
      const profilesMap = new Map();
      profilesData.forEach(profile => {
        profilesMap.set(profile.id, profile);
      });

      // Format orders data
      const formattedOrders = (ordersData || []).map(order => ({
        id: order.id,
        product: {
          name: order.products?.name || 'Unknown Product',
          price: order.products?.price || 0,
          images: order.products?.images || [],
          brand: order.products?.brand || 'Unknown Brand'
        },
        seller: {
          name: profilesMap.get(order.seller_id)?.name || 'Unknown Seller'
        },
        total_amount: order.total_amount,
        status: order.status,
        created_at: order.created_at
      }));

      setOrders(formattedOrders);
      setListings(listingsData || []);

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.id]);

  const handleListingUpdate = () => {
    fetchUserData();
    refetch();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t('profile.signin.required')}</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <ProfileHeader />

          {/* Real-time Statistics */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t('profile.statistics.title')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                title={t('profile.statistics.total.listings')}
                value={stats.totalListings}
                icon="📦"
                color="blue"
              />
              <StatCard
                title={t('profile.statistics.active.listings')}
                value={stats.activeListings}
                icon="🔥"
                color="green"
              />
              <StatCard
                title={t('profile.statistics.items.sold')}
                value={stats.soldListings}
                icon="✅"
                color="purple"
              />
              <StatCard
                title={t('profile.statistics.total.views')}
                value={stats.totalViews}
                icon="👀"
                color="orange"
              />
            </div>

            {/* Performance Metrics */}
            {stats.totalListings > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard
                  title={t('profile.statistics.total.earnings')}
                  value={`€${stats.totalEarnings.toFixed(2)}`}
                  icon="💰"
                  color="green"
                />
                <StatCard
                  title={t('profile.statistics.response.rate')}
                  value={`${stats.responseRate}%`}
                  icon="💬"
                  color="blue"
                />
                <StatCard
                  title={t('profile.statistics.avg.rating')}
                  value={stats.avgRating > 0 ? `${stats.avgRating.toFixed(1)} ⭐` : t('profile.statistics.no.ratings')}
                  icon="⭐"
                  color="yellow"
                />
              </div>
            )}

            {/* Member Since */}
            {stats.memberSince && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-700">
                  <strong>{t('profile.member.since')}:</strong> {new Date(stats.memberSince).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            )}

            {/* Zero State for New Users */}
            {stats.totalListings === 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center mb-6">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{t('profile.ready.selling')}</h3>
                <p className="text-blue-600 mb-4">
                  {t('profile.first.listing.desc')}
                </p>
                <a href="/product-listing" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {t('profile.create.first.listing')}
                </a>
              </div>
            )}
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {t('nav.profile')}
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                {t('nav.orders')} ({orders.length})
              </TabsTrigger>
              <TabsTrigger value="listings" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                {t('profile.listings')} ({listings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileInfo />
            </TabsContent>

            <TabsContent value="orders">
              <OrdersTab orders={orders} />
            </TabsContent>

            <TabsContent value="listings">
              <EditableListingsTab listings={listings} onListingUpdate={handleListingUpdate} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
