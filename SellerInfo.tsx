
import { Star } from "lucide-react";

interface SellerInfoProps {
  seller: {
    name?: string;
    profile_picture?: string;
    city?: string;
  };
  location: string;
}

const SellerInfo = ({ seller, location }: SellerInfoProps) => {
  return (
    <div className="mb-8 rounded-lg bg-secondary/30 p-4">
      <div className="flex items-center gap-3">
        <img 
          src={seller?.profile_picture || "/placeholder.svg"} 
          alt={seller?.name || 'Seller'} 
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{seller?.name || 'Unknown Seller'}</p>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>4.5</span>
            <span className="text-muted-foreground">• {seller?.city || location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
