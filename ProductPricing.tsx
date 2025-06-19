
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface ProductPricingProps {
  control: Control<any>;
}

const ProductPricing: React.FC<ProductPricingProps> = ({ control }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Selling Price ($)</FormLabel>
            <FormControl>
              <Input type="number" min="0" step="0.01" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="originalPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Original Price ($) (Optional)</FormLabel>
            <FormControl>
              <Input type="number" min="0" step="0.01" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductPricing;
