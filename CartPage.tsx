
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/contexts/LanguageContext";

const CartPage = () => {
  const { user } = useAuth();
  const { cartItems, loading, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { t } = useLanguage();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t('cart.signin')}</h1>
            <Link to="/auth">
              <Button>{t('nav.signin')}</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalAmount = getCartTotal();

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <Link to="/browse" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            {t('browse.continue')}
          </Link>

          <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">{t('cart.empty')}</h2>
              <p className="text-muted-foreground mb-6">
                {t('cart.empty.subtitle')}
              </p>
              <Link to="/browse">
                <Button>{t('cart.start')}</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.products?.images?.[0] || '/placeholder.svg'}
                          alt={item.products?.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.products?.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.products?.brand} • {item.products?.condition}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t('common.size')}: {item.products?.size || 'N/A'}
                          </p>
                          <p className="font-bold mt-2">${item.products?.price}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">{t('checkout.summary')}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>{t('cart.subtotal')} ({cartItems.length} {t('browse.items')})</span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('cart.shipping')}</span>
                        <span>{t('cart.free')}</span>
                      </div>
                    </div>
                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between font-bold text-lg">
                        <span>{t('cart.total')}</span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                    <Link to="/checkout-placeholder" className="block">
                      <Button className="w-full" size="lg">
                        {t('cart.checkout')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
