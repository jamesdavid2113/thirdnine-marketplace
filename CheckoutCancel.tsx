
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CheckoutCancel = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="py-8">
        <div className="container mx-auto max-w-2xl px-4">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl text-red-600">{t('cancel.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                {t('cancel.message')}
              </p>
              
              <p className="text-sm text-muted-foreground">
                {t('cancel.cart')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cart">
                  <Button variant="outline">{t('cancel.return')}</Button>
                </Link>
                <Link to="/browse">
                  <Button>{t('browse.continue')}</Button>
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

export default CheckoutCancel;
