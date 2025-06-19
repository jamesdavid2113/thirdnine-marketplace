
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ShippingAddressForm from "@/components/checkout/ShippingAddressForm";
import PaymentMethodCard from "@/components/checkout/PaymentMethodCard";
import OrderSummary from "@/components/checkout/OrderSummary";

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, getCartTotal } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States"
  });

  const totalAmount = getCartTotal();

  const validateShippingAddress = () => {
    if (!shippingAddress.fullName || !shippingAddress.address || 
        !shippingAddress.city || !shippingAddress.postalCode) {
      toast({
        title: t('common.error'),
        description: "Please fill in all shipping address fields",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const placeOrder = async () => {
    if (!user || cartItems.length === 0) {
      toast({
        title: t('common.error'),
        description: "Invalid order data",
        variant: "destructive",
      });
      return;
    }

    if (!validateShippingAddress()) return;

    setIsLoading(true);

    try {
      console.log("Creating Stripe checkout session...");
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          cartItems,
          shippingAddress,
        }
      });

      if (error) {
        console.error("Stripe checkout error:", error);
        throw error;
      }

      if (data?.url) {
        console.log("Redirecting to Stripe checkout:", data.url);
        window.open(data.url, '_blank');
        
        toast({
          title: "Redirecting to payment",
          description: "Opening Stripe checkout in a new tab...",
        });
      } else {
        throw new Error("No checkout URL received");
      }

    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Error creating checkout",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t('checkout.signin')}</h1>
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
          <h1 className="text-3xl font-bold mb-8">{t('checkout.title')}</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <ShippingAddressForm 
                  shippingAddress={shippingAddress}
                  onAddressChange={setShippingAddress}
                />
                <PaymentMethodCard />
              </div>

              <div>
                <OrderSummary 
                  cartItems={cartItems}
                  totalAmount={totalAmount}
                  isLoading={isLoading}
                  onSubmit={placeOrder}
                />
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
