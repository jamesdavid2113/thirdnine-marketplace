
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/contexts/LanguageContext";

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const { refetch: refetchCart } = useCart();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const processPayment = async () => {
      try {
        await refetchCart();
        setIsProcessing(false);
      } catch (error) {
        console.error("Error processing payment:", error);
        setIsProcessing(false);
      }
    };

    if (sessionId) {
      processPayment();
    } else {
      setIsProcessing(false);
    }
  }, [sessionId, refetchCart]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="py-8">
        <div className="container mx-auto max-w-2xl px-4">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">{t('success.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isProcessing ? (
                <p className="text-muted-foreground">{t('success.processing')}</p>
              ) : (
                <>
                  <p className="text-muted-foreground">
                    {t('success.thanks')}
                  </p>
                  
                  {sessionId && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium">{t('success.reference')}</p>
                      <p className="text-xs text-muted-foreground font-mono">{sessionId}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {t('success.details')}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/profile">
                      <Button variant="outline">{t('success.orders')}</Button>
                    </Link>
                    <Link to="/browse">
                      <Button>{t('success.continue')}</Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
