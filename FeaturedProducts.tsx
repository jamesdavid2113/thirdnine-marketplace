
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Category } from "@/types";
import CategoryFilter from "./CategoryFilter";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedProducts = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <h2 className="text-3xl font-bold">{t('featured.title')}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
