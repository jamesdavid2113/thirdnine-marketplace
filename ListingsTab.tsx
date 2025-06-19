
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

interface Listing {
  id: string;
  name: string;
  brand: string;
  condition: string;
  category: string;
  subcategory: string;
  price: number;
  images: string[];
  status: string;
  created_at: string;
}

interface ListingsTabProps {
  listings: Listing[];
}

const ListingsTab = ({ listings }: ListingsTabProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'sold': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (listings.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
          <p className="text-muted-foreground">You haven't listed any items for sale yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <Card key={listing.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img
                src={listing.images?.[0] || '/placeholder.svg'}
                alt={listing.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{listing.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {listing.brand} • {listing.condition}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {listing.category} • {listing.subcategory}
                </p>
                <p className="font-bold">${listing.price}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(listing.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListingsTab;
