
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: '🏆',
      title: t('features.quality.title'),
      description: t('features.quality.desc')
    },
    {
      icon: '💚',
      title: t('features.sustainable.title'),
      description: t('features.sustainable.desc')
    },
    {
      icon: '🤝',
      title: t('features.community.title'),
      description: t('features.community.desc')
    },
    {
      icon: '🔒',
      title: t('features.secure.title'),
      description: t('features.secure.desc')
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 resport-card">
              <div className="text-4xl mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 min-h-[3rem] flex items-center justify-center px-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm px-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
