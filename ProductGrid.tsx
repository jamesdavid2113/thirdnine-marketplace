
import React from 'react';
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';
import { Product } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  category?: string;
}

const ProductGrid = ({ products, loading, category }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="h-4 rounded" />
            <Skeleton className="h-3 rounded w-3/4" />
            <Skeleton className="h-3 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyState category={category} />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
