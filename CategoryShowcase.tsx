
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const CategoryShowcase = () => {
  const { t } = useLanguage();
  
  const categories = [
    {
      id: 'golf',
      name: t('category.golf'),
      description: t('category.golf.detailed'),
      icon: '⛳',
      gradient: 'from-green-600/80 to-green-800/80',
      bgClass: 'bg-gradient-to-br from-green-100 to-green-200'
    },
    {
      id: 'tennis',
      name: t('category.tennis'),
      description: t('category.tennis.detailed'),
      icon: '🎾',
      gradient: 'from-yellow-600/80 to-orange-800/80',
      bgClass: 'bg-gradient-to-br from-yellow-100 to-orange-200'
    },
    {
      id: 'cycling',
      name: t('category.cycling'),
      description: t('category.cycling.detailed'),
      icon: '🚴‍♂️',
      gradient: 'from-blue-600/80 to-blue-800/80',
      bgClass: 'bg-gradient-to-br from-blue-100 to-blue-200'
    },
    {
      id: 'padel',
      name: t('category.padel'),
      description: t('category.padel.detailed'),
      icon: '🏓',
      gradient: 'from-purple-600/80 to-purple-800/80',
      bgClass: 'bg-gradient-to-br from-purple-100 to-purple-200'
    },
    {
      id: 'hockey',
      name: t('category.hockey'),
      description: t('category.hockey.detailed'),
      icon: '🏒',
      gradient: 'from-red-600/80 to-red-800/80',
      bgClass: 'bg-gradient-to-br from-red-100 to-red-200'
    }
  ];

  const handleCategoryClick = () => {
    // Scroll to top when navigating to browse page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            {t('category.shop.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('category.shop.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/browse?category=${category.id}`}
              onClick={handleCategoryClick}
              className="block group"
            >
              <div className={`relative h-80 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${category.bgClass}`}>
                {/* Overlay for better text readability */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} group-hover:opacity-90 transition-opacity`} />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                  {/* Top section with icon */}
                  <div className="flex justify-center">
                    <div className="text-4xl">{category.icon}</div>
                  </div>
                  
                  {/* Bottom section with text and button */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-4 min-h-[3rem] flex items-center justify-center">
                      {category.description}
                    </p>
                    
                    <Button 
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors border-0 w-full"
                    >
                      {t('category.browse')} {category.name}
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/browse?category=all" onClick={handleCategoryClick}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              🏃‍♂️ {t('category.browse.all.sports')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
