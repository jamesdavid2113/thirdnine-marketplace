
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  category?: string;
}

const EmptyState = ({ category }: EmptyStateProps) => {
  const getCategoryInfo = (cat?: string) => {
    const categories: Record<string, { name: string; icon: string; description: string }> = {
      golf: { name: "Golf", icon: "⛳", description: "golf equipment" },
      tennis: { name: "Tennis", icon: "🎾", description: "tennis equipment" },
      padel: { name: "Padel", icon: "🏓", description: "padel equipment" },
      hockey: { name: "Hockey", icon: "🏒", description: "hockey equipment" },
      cycling: { name: "Cycling", icon: "🚴‍♂️", description: "cycling equipment" },
    };
    
    return categories[cat || ''] || { name: "products", icon: "📦", description: "sports equipment" };
  };

  const categoryInfo = getCategoryInfo(category);
  
  return (
    <div className="text-center py-16 bg-gray-50 rounded-lg">
      <div className="text-6xl mb-4">
        {categoryInfo.icon}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No {categoryInfo.name} listings yet
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Be the first to list {categoryInfo.description}! 
        Help build our {categoryInfo.name.toLowerCase()} community.
      </p>
      
      <Link to={`/list-product${category ? `?category=${category}` : ''}`}>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <span className="mr-2">🚀</span>
          List First {categoryInfo.name} Item
        </Button>
      </Link>
    </div>
  );
};

export default EmptyState;
