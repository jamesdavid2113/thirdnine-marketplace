
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Tag, Users, Award } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";

const OnboardingLanding = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen resport-hero-bg">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-12">
            <h1 className="text-6xl font-bold text-white mb-4 md:text-8xl tracking-tight">
              ReSport
            </h1>
            <p className="text-2xl md:text-3xl font-light tracking-widest text-green-100 mb-8">
              RELIVED. RELOVED. RESPORT.
            </p>
            <p className="text-xl text-green-50 max-w-2xl mx-auto leading-relaxed">
              {t('onboarding.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Link to={user ? "/browse" : "/auth"} className="block group">
              <div className="resport-card bg-white/10 backdrop-blur-lg border-white/20 p-8 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{t('onboarding.buyer')}</h2>
                <p className="text-green-100 mb-6">
                  {t('onboarding.buyer.desc')}
                </p>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full rounded-full border-2 border-white bg-transparent text-white hover:bg-white/20 group-hover:bg-white group-hover:text-primary transition-all"
                >
                  {user ? t('onboarding.start.shopping') : t('onboarding.signup.buy')}
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Link>
            
            <Link to={user ? "/list-product" : "/auth"} className="block group">
              <div className="resport-card bg-white/10 backdrop-blur-lg border-white/20 p-8 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Tag className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{t('onboarding.seller')}</h2>
                <p className="text-green-100 mb-6">
                  {t('onboarding.seller.desc')}
                </p>
                <Button 
                  size="lg" 
                  className="w-full bg-white text-primary hover:bg-green-50 rounded-full group-hover:shadow-xl transition-all"
                >
                  {user ? t('onboarding.start.selling') : t('onboarding.signup.sell')}
                  <Tag className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Users className="h-8 w-8 text-white mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">{t('onboarding.community')}</h3>
              <p className="text-green-100 text-sm">{t('onboarding.community.desc')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Award className="h-8 w-8 text-white mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">{t('onboarding.quality')}</h3>
              <p className="text-green-100 text-sm">{t('onboarding.quality.desc')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-2xl mb-3">🌱</div>
              <h3 className="text-white font-semibold mb-2">{t('onboarding.sustainable')}</h3>
              <p className="text-green-100 text-sm">{t('onboarding.sustainable.desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLanding;
