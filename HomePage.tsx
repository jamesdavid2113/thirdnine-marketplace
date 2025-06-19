
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ShoppingBag, Tag, TrendingUp, Users } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const HomePage = () => {
  const { user, profile, loading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Only redirect if we have a user but incomplete profile
  useEffect(() => {
    if (!loading && user && !profile?.name) {
      console.log('Redirecting to complete profile - user exists but profile incomplete');
      navigate("/complete-profile");
    }
  }, [user, profile, loading, navigate]);

  // Show loading while auth is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If redirecting, don't render the page
  if (user && !profile?.name) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <NavBar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            {profile?.name ? `${t('home.welcome.user')}, ${profile.name}!` : t('home.welcome')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          <Card className="resport-card hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-gray-800">{t('home.start.shopping')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center flex flex-col flex-grow">
              <p className="text-gray-600 mb-6 flex-grow">
                {t('home.start.shopping.desc')}
              </p>
              <Link to="/browse" className="w-full">
                <Button className="resport-button w-full">
                  {t('home.browse.products')}
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="resport-card hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-gray-800">{t('home.start.selling')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center flex flex-col flex-grow">
              <p className="text-gray-600 mb-6 flex-grow">
                {t('home.start.selling.desc')}
              </p>
              <Link to="/list-product" className="w-full">
                <Button className="resport-button w-full">
                  {t('home.list.gear')}
                  <Tag className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">10K+</h3>
            <p className="text-gray-600">{t('home.stats.athletes')}</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">50K+</h3>
            <p className="text-gray-600">{t('home.stats.sold')}</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">98%</h3>
            <p className="text-gray-600">{t('home.stats.satisfaction')}</p>
          </div>
        </div>

        {/* Categories Preview */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('home.popular.categories')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('home.popular.desc')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { name: "Running", emoji: "🏃‍♂️", count: "2.1K items" },
            { name: "Golf", emoji: "⛳", count: "1.8K items" },
            { name: "Football", emoji: "🏈", count: "1.2K items" },
            { name: "Tennis", emoji: "🎾", count: "950 items" }
          ].map((category) => (
            <Link key={category.name} to={`/category/${category.name.toLowerCase()}`}>
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">{category.emoji}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary to-green-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">{t('home.cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100">
                {t('home.start.shopping')}
              </Button>
            </Link>
            <Link to="/list-product">
              <Button size="lg" className="bg-white/20 hover:bg-white/30 border-white text-white">
                {t('home.start.selling')}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
