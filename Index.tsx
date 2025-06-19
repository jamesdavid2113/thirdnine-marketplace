
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoryShowcase from "@/components/CategoryShowcase";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturesSection from "@/components/FeaturesSection";
import PromoSection from "@/components/PromoSection";
import TestimonialSection from "@/components/TestimonialSection";
import FeaturedProductsSlider from "@/components/FeaturedProductsSlider";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Shield, Users } from "lucide-react";

const Index = () => {
  const { user, profile, loading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Redirect authenticated users to appropriate page
  useEffect(() => {
    if (loading) return;
    
    if (user && profile) {
      // If user has completed profile, redirect to home
      if (profile.name) {
        navigate("/home");
      } else {
        // If profile incomplete, redirect to complete profile
        navigate("/complete-profile");
      }
    }
  }, [user, profile, loading, navigate]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Only show landing page to non-authenticated users
  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <NavBar />
      
      {/* Featured Products Slider - Added above hero */}
      <FeaturedProductsSlider />
      
      <main>
        <HeroSection />
        
        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {t('home.why.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('home.why.subtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 resport-card">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('home.effortless.title')}</h3>
                <p className="text-gray-600">
                  {t('home.effortless.desc')}
                </p>
              </div>
              
              <div className="text-center p-8 resport-card">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('home.quality.title')}</h3>
                <p className="text-gray-600">
                  {t('home.quality.desc')}
                </p>
              </div>
              
              <div className="text-center p-8 resport-card">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('home.community.title')}</h3>
                <p className="text-gray-600">
                  {t('home.community.desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection />
        <CategoryShowcase />
        <FeaturedProducts />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
