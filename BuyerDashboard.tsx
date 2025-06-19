
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { ShoppingBag, Heart, Search, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BuyerDashboard = () => {
  const { user, profile } = useAuth();
  const { t } = useLanguage();

  // Mock data for now since we don't have database tables
  const mockStats = {
    totalOrders: 3,
    totalSpent: 245.50,
    cartItems: 2,
    sportsInterests: profile?.sportsInterests?.length || 0
  };

  const mockOrders = [
    {
      id: "1",
      product: {
        name: "Nike Running Shoes",
        images: ["/placeholder.svg"],
        brand: "Nike"
      },
      seller: { name: "John Doe" },
      total_amount: 75,
      status: "delivered",
      created_at: "2024-01-15"
    },
    {
      id: "2", 
      product: {
        name: "Golf Clubs Set",
        images: ["/placeholder.svg"],
        brand: "Titleist"
      },
      seller: { name: "Sarah Smith" },
      total_amount: 450,
      status: "shipped",
      created_at: "2024-01-10"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t('dashboard.signin.required')}</h1>
            <Link to="/auth">
              <Button>{t('nav.signin')}</Button>
            </Link>
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
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">{t('dashboard.buyer.title')}</h1>
              <p className="text-muted-foreground">
                {t('dashboard.welcome.back')}, {profile?.name || t('dashboard.buyer')}! {t('dashboard.discover.deals')}
              </p>
            </div>
            <Link to="/browse">
              <Button className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                {t('nav.browse')}
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('dashboard.total.orders')}</p>
                    <p className="text-2xl font-bold">{mockStats.totalOrders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('dashboard.total.spent')}</p>
                    <p className="text-2xl font-bold">€{mockStats.totalSpent.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShoppingBag className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('dashboard.cart.items')}</p>
                    <p className="text-2xl font-bold">{mockStats.cartItems}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Heart className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('dashboard.sports.interests')}</p>
                    <p className="text-2xl font-bold">{mockStats.sportsInterests}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/browse">
                <CardContent className="p-6 text-center">
                  <Search className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{t('nav.browse')}</h3>
                  <p className="text-sm text-muted-foreground">{t('dashboard.discover.equipment')}</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/cart">
                <CardContent className="p-6 text-center">
                  <ShoppingBag className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2">{t('dashboard.view.cart')}</h3>
                  <p className="text-sm text-muted-foreground">{mockStats.cartItems} {t('dashboard.items.in.cart')}</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/profile">
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 mx-auto text-red-600 mb-4" />
                  <h3 className="font-semibold mb-2">{t('nav.profile')}</h3>
                  <p className="text-sm text-muted-foreground">{t('dashboard.update.preferences')}</p>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Sports Interests */}
          {profile?.sportsInterests && profile.sportsInterests.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t('dashboard.your.sports.interests')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {profile.sportsInterests.map((sport) => (
                    <Link key={sport} to={`/category/${sport}`}>
                      <Button variant="outline" size="sm" className="capitalize">
                        {sport}
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.recent.orders')}</CardTitle>
            </CardHeader>
            <CardContent>
              {mockOrders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{t('dashboard.no.orders')}</h3>
                  <p className="text-muted-foreground mb-4">{t('dashboard.start.shopping.desc')}</p>
                  <Link to="/browse">
                    <Button>{t('home.start.shopping')}</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex gap-4 p-4 border rounded-lg">
                      <img
                        src={order.product?.images?.[0] || '/placeholder.svg'}
                        alt={order.product?.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{order.product?.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {order.product?.brand} • {t('dashboard.seller')}: {order.seller?.name}
                            </p>
                            <p className="font-bold">€{order.total_amount}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {mockOrders.length > 5 && (
                    <div className="text-center pt-4">
                      <Link to="/profile">
                        <Button variant="outline">{t('dashboard.view.all.orders')}</Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuyerDashboard;
