
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import { ProductCategory, SubcategoryOption } from "@/types";

interface CategorySelectorProps {
  control: Control<any>;
  selectedCategory: ProductCategory;
  selectedSubcategory: string;
  availableSizes: string[];
  categoryConfig: Record<ProductCategory, SubcategoryOption[]>;
  onCategoryChange: (category: ProductCategory) => void;
  onSubcategoryChange: (subcategory: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  control,
  selectedCategory,
  selectedSubcategory,
  availableSizes,
  categoryConfig,
  onCategoryChange,
  onSubcategoryChange
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value: ProductCategory) => onCategoryChange(value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="golf">Golf</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="subcategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory</FormLabel>
              <Select 
                value={field.value} 
                onValueChange={(value) => onSubcategoryChange(value)}
                disabled={!selectedCategory}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectedCategory && 
                    categoryConfig[selectedCategory].map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="size"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Size</FormLabel>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={!selectedSubcategory || availableSizes.length === 0}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableSizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CategorySelector;
