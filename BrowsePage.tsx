
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import CategoryFilter from "@/components/CategoryFilter";
import CategoryFooter from "@/components/CategoryFooter";
import { Category } from "@/types";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const BrowsePage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") as Category;
  const [activeCategory, setActiveCategory] = useState<Category>(categoryParam || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const { products, loading, error } = useProductsByCategory(activeCategory === "all" ? null : activeCategory);
  const { t } = useLanguage();

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    searchQuery === '' || 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (categoryParam && ['all', 'golf', 'tennis', 'padel', 'hockey', 'cycling'].includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t('browse.title')}</h1>
            <p className="text-muted-foreground">
              {t('browse.subtitle')}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={t('browse.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />

          {/* Category Info */}
          <div className="mb-6">
            <div className="text-muted-foreground">
              {activeCategory === 'all' ? t('browse.all') : `${t(`category.${activeCategory}`)} ${t('category.equipment')}`}
              {filteredProducts.length > 0 && (
                <span className="ml-2">({filteredProducts.length} {t('browse.items')})</span>
              )}
            </div>
          </div>

          {error ? (
            <div className="text-center py-12">
              <div className="text-red-500 text-lg mb-2">{t('browse.error')}</div>
              <p className="text-gray-500">{error}</p>
            </div>
          ) : (
            <ProductGrid 
              products={filteredProducts} 
              loading={loading} 
              category={activeCategory === 'all' ? undefined : activeCategory}
            />
          )}
        </div>
      </main>
      
      {/* Add Category Footer */}
      <CategoryFooter />
      
      <Footer />
    </div>
  );
};

export default BrowsePage;
