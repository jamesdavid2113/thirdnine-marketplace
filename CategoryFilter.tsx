
import { Category } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  activeCategory: Category;
  onChange: (category: Category) => void;
}

const CategoryFilter = ({ activeCategory, onChange }: CategoryFilterProps) => {
  const categories: { value: Category; label: string; icon: string }[] = [
    { value: "all", label: "All Sports", icon: "🏃‍♂️" },
    { value: "golf", label: "Golf", icon: "⛳" },
    { value: "tennis", label: "Tennis", icon: "🎾" },
    { value: "padel", label: "Padel", icon: "🏓" },
    { value: "hockey", label: "Hockey", icon: "🏒" },
    { value: "cycling", label: "Cycling", icon: "🚴‍♂️" },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Shop by Sport</h3>
      
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.value}
            category={category}
            isSelected={activeCategory === category.value}
            onClick={() => onChange(category.value)}
          />
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden flex space-x-3 overflow-x-auto pb-4">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onChange(category.value)}
            className={cn(
              "flex flex-col items-center space-y-2 p-4 rounded-xl border-2 min-w-[100px] transition-all duration-200",
              activeCategory === category.value
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
            )}
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="text-sm font-medium text-center leading-tight">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Category Card Component with Perfect Alignment
const CategoryCard = ({ category, isSelected, onClick }: {
  category: { value: Category; label: string; icon: string };
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-xl border-2 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg",
        isSelected
          ? "border-blue-600 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"
      )}
    >
      {/* Icon */}
      <div className="flex justify-center mb-3">
        <span className="text-3xl">{category.icon}</span>
      </div>
      
      {/* Category Name */}
      <h4 className={cn(
        "font-semibold text-sm mb-2",
        isSelected ? "text-blue-700" : "text-gray-900 group-hover:text-blue-700"
      )}>
        {category.label}
      </h4>
      
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
        </div>
      )}
    </button>
  );
};

export default CategoryFilter;
