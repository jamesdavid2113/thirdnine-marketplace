
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import ImageCarousel from "./ImageCarousel";

const GetStartedButton = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleGetStarted = () => {
    navigate('/signup');
  };
  
  return (
    <Button 
      size="lg" 
      className="resport-button text-lg px-12 py-4 w-full cursor-pointer" 
      onClick={handleGetStarted}
    >
      {t('hero.cta')}
    </Button>
  );
};

const HeroRightSection = () => {
  const { t } = useLanguage();
  
  // Define carousel images using uploaded images
  const carouselImages = [{
    src: '/lovable-uploads/232a58cd-b6e6-41f2-aebd-03a4e26b0a33.png',
    alt: 'Professional golfer celebrating sports achievements'
  }, {
    src: '/lovable-uploads/1fbcac8b-610f-4a46-9a64-d154b489812f.png',
    alt: 'Classic football moment showcasing athletic excellence'
  }, {
    src: '/lovable-uploads/e70ddffc-3d80-4357-8266-de4db25f93c8.png',
    alt: 'Kitesurfer demonstrating premium water sports equipment'
  }, {
    src: '/lovable-uploads/f8570885-86b1-4c72-9f3f-ef3518fa9ff0.png',
    alt: 'Professional cyclist in yellow jersey racing through mountains'
  }, {
    src: '/lovable-uploads/95354a7a-5be1-42b5-b7a5-581ddfec3220.png',
    alt: 'Tennis player showing intense competitive spirit'
  }];
  
  return (
    <div className="flex flex-col items-center justify-center space-y-6 h-full">
      {/* Image Carousel - Made larger */}
      <div className="w-full max-w-2xl">
        <ImageCarousel images={carouselImages} autoRotateInterval={3000} />
      </div>
      
      {/* Quote under the carousel */}
      <div className="text-center max-w-lg">
        <blockquote className="text-xl italic text-green-100 leading-relaxed">
          "{t('hero.quote')}"
        </blockquote>
        <div className="mt-3 text-base text-green-200">
          - {t('hero.quote.author')}
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="relative overflow-hidden resport-hero-bg py-20 text-white md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
          <div className="max-w-2xl">
            <div className="mb-8">
              <h1 className="mb-6 text-5xl font-bold md:text-7xl lg:text-8xl tracking-tight">
                {t('hero.title')}
              </h1>
              <p className="text-2xl md:text-3xl font-light tracking-widest text-green-100 mb-8">
                {t('hero.tagline')}
              </p>
            </div>
            <p className="mb-10 text-xl md:text-2xl leading-relaxed text-green-50">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col gap-6">
              <GetStartedButton />
              <Link to="/browse" className="w-full">
                <Button size="lg" variant="outline" className="w-full rounded-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-lg px-12 py-4 transition-all duration-300">
                  {t('hero.browse')}
                </Button>
              </Link>
            </div>
            
            {/* Additional Features/Benefits */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-green-100">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>{t('hero.verified')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>{t('hero.secure')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>{t('hero.local')}</span>
              </div>
            </div>
          </div>
          
          <HeroRightSection />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-400/20 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-green-300/20 blur-3xl"></div>
    </div>
  );
};

export default HeroSection;
