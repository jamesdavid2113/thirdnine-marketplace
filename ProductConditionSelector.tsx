
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import { Control } from "react-hook-form";

interface ProductConditionSelectorProps {
  control: Control<any>;
}

const ProductConditionSelector: React.FC<ProductConditionSelectorProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="condition"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Condition</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-wrap gap-3"
            >
              {["New", "Like New", "Good", "Fair", "Poor"].map((condition) => (
                <FormItem key={condition} className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem
                      value={condition}
                      id={`condition-${condition}`}
                      className="peer sr-only"
                    />
                  </FormControl>
                  <label
                    htmlFor={`condition-${condition}`}
                    className="flex cursor-pointer items-center justify-center rounded-full border px-3 py-1 text-sm peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                  >
                    {condition}
                  </label>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductConditionSelector;
