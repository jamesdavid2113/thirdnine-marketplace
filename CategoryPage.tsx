
import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";
import { useLanguage } from "@/contexts/LanguageContext";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { products, loading, error } = useProductsByCategory(category);
  const { t } = useLanguage();

  const getCategoryTitle = (cat?: string) => {
    if (!cat) return t('category.equipment');
    return t(`category.${cat}`);
  };

  const getCategoryIcon = (cat?: string) => {
    const icons: Record<string, string> = {
      golf: '⛳',
      tennis: '🎾',
      padel: '🏓', 
      hockey: '🏒',
      cycling: '🚴‍♂️'
    };
    return icons[cat || ''] || '🏃‍♂️';
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <div className="text-6xl mb-4">{getCategoryIcon(category)}</div>
            <h1 className="text-3xl font-bold mb-2">
              {getCategoryTitle(category)} {t('category.equipment')}
            </h1>
            <p className="text-muted-foreground">
              {t('category.browse')} {category} {t('category.from')}
            </p>
          </div>

          {error ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2 text-red-600">{t('browse.error')}</h3>
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : (
            <ProductGrid 
              products={products} 
              loading={loading} 
              category={category}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
