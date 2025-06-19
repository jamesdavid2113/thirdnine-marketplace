
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowLeft, CreditCard, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CheckoutPlaceholder = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="py-8">
        <div className="container mx-auto max-w-2xl px-4">
          <Link to="/cart" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            {t('cart.checkout')}
          </Link>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-10 h-10 text-white animate-pulse" />
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('common.loading')}...
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  {t('checkout.secure')}
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center justify-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    {t('checkout.payment')}
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-2 text-left">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {t('checkout.secure')}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {t('checkout.pay')}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {t('checkout.held')}
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center justify-center gap-2">
                    <Shield className="h-5 w-5" />
                    {t('hero.secure')}
                  </h3>
                  <p className="text-sm text-green-800 mb-3">
                    {t('checkout.secure')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/browse">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    {t('browse.continue')}
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="outline">
                    {t('cancel.return')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPlaceholder;
