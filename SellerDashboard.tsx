
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { Package, ShoppingBag, TrendingUp, DollarSign } from "lucide-react";

// Mock data for products and orders since database tables don't exist
const mockProducts = [
  {
    id: "1",
    name: "Football Helmet",
    brand: "Riddell",
    condition: "Like New",
    category: "football",
    subcategory: "protective",
    price: 85,
    images: ["/placeholder.svg"],
    status: "active",
    created_at: "2024-01-10T09:15:00Z"
  },
  {
    id: "2",
    name: "Running Watch",
    brand: "Garmin",
    condition: "Good",
    category: "running",
    subcategory: "accessories",
    price: 150,
    images: ["/placeholder.svg"],
    status: "sold",
    created_at: "2024-01-12T16:45:00Z"
  }
];

const mockOrders = [
  {
    id: "1",
    product: {
      name: "Nike Running Shoes",
      price: 75,
      images: ["/placeholder.svg"],
      brand: "Nike"
    },
    buyer: {
      name: "Jane Smith"
    },
    total_amount: 75,
    status: "delivered",
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    product: {
      name: "Golf Clubs Set",
      price: 450,
      images: ["/placeholder.svg"],
      brand: "Titleist"
    },
    buyer: {
      name: "Mike Johnson"
    },
    total_amount: 450,
    status: "shipped",
    created_at: "2024-01-20T14:30:00Z"
  }
];

const SellerDashboard = () => {
  const { user, profile } = useAuth();

  // Use mock data instead of Supabase queries
  const products = user ? mockProducts : [];
  const orders = user ? mockOrders : [];

  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const activeListings = products.filter(p => p.status === 'active').length;
  const soldItems = products.filter(p => p.status === 'sold').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'sold': return 'text-blue-600 bg-blue-100';
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
            <h1 className="text-2xl font-bold mb-4">Please sign in to access seller dashboard</h1>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {profile?.name || user.email}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">${totalRevenue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                    <p className="text-2xl font-bold">{activeListings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Items Sold</p>
                    <p className="text-2xl font-bold">{soldItems}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <ShoppingBag className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products">My Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>My Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No products listed</h3>
                        <p className="text-muted-foreground">You haven't listed any products for sale yet.</p>
                      </div>
                    ) : (
                      products.map((product) => (
                        <Card key={product.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={product.images?.[0] || '/placeholder.svg'}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold">{product.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {product.brand} • {product.condition} • {product.category}
                                </p>
                                <p className="font-bold">${product.price}</p>
                              </div>
                              <div className="text-right">
                                <Badge className={`mb-2 ${getStatusColor(product.status)}`}>
                                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                                </Badge>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(product.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                        <p className="text-muted-foreground">You haven't received any orders yet.</p>
                      </div>
                    ) : (
                      orders.map((order) => (
                        <Card key={order.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={order.product?.images?.[0] || '/placeholder.svg'}
                                alt={order.product?.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold">{order.product?.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {order.product?.brand}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Buyer: {order.buyer?.name}
                                </p>
                                <p className="font-bold">${order.total_amount}</p>
                              </div>
                              <div className="text-right">
                                <Badge className={`mb-2 ${getStatusColor(order.status)}`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(order.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellerDashboard;
