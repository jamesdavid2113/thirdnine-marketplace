
import ProductListingContainer from "@/components/listing/ProductListingContainer";

// Export the ProductFormData interface for use in other components
export type { ProductFormData } from "@/components/listing/ProductListingContainer";

const ProductListing = () => {
  return <ProductListingContainer />;
};

export default ProductListing;
