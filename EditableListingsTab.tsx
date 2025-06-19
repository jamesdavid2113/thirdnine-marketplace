
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Edit, Trash2, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

interface EditableListingsTabProps {
  listings: Listing[];
  onListingUpdate: () => void;
}

const EditableListingsTab = ({ listings, onListingUpdate }: EditableListingsTabProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>("");
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'sold': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const startEditing = (listing: Listing) => {
    setEditingId(listing.id);
    setEditPrice(listing.price.toString());
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditPrice("");
  };

  const savePrice = async (listingId: string) => {
    setLoading(listingId);
    try {
      const newPrice = parseFloat(editPrice);
      if (isNaN(newPrice) || newPrice <= 0) {
        toast({
          title: "Invalid price",
          description: "Please enter a valid price greater than 0",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('products')
        .update({ price: newPrice })
        .eq('id', listingId);

      if (error) throw error;

      toast({
        title: "Price updated",
        description: "Your listing price has been updated successfully",
      });

      setEditingId(null);
      setEditPrice("");
      onListingUpdate();
    } catch (error) {
      console.error('Error updating price:', error);
      toast({
        title: "Error",
        description: "Failed to update price. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const markAsSold = async (listingId: string) => {
    setLoading(listingId);
    try {
      const { error } = await supabase
        .from('products')
        .update({ status: 'sold' })
        .eq('id', listingId);

      if (error) throw error;

      toast({
        title: "Item marked as sold",
        description: "Your listing has been marked as sold",
      });

      onListingUpdate();
    } catch (error) {
      console.error('Error marking as sold:', error);
      toast({
        title: "Error",
        description: "Failed to mark item as sold. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const deleteListing = async (listingId: string) => {
    if (!confirm("Are you sure you want to delete this listing? This action cannot be undone.")) {
      return;
    }

    setLoading(listingId);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', listingId);

      if (error) throw error;

      toast({
        title: "Listing deleted",
        description: "Your listing has been deleted successfully",
      });

      onListingUpdate();
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast({
        title: "Error",
        description: "Failed to delete listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
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
                
                {editingId === listing.id ? (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm">€</span>
                    <Input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-20 h-8"
                      min="0"
                      step="0.01"
                    />
                    <Button
                      size="sm"
                      onClick={() => savePrice(listing.id)}
                      disabled={loading === listing.id}
                      className="h-8 px-2"
                    >
                      <Save className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={cancelEditing}
                      disabled={loading === listing.id}
                      className="h-8 px-2"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-bold">€{listing.price}</p>
                    {listing.status === 'active' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEditing(listing)}
                        className="h-6 px-1"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="text-right flex flex-col items-end gap-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                </span>
                <p className="text-xs text-muted-foreground">
                  {new Date(listing.created_at).toLocaleDateString()}
                </p>
                
                <div className="flex gap-1">
                  {listing.status === 'active' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markAsSold(listing.id)}
                      disabled={loading === listing.id}
                      className="h-7 px-2"
                    >
                      Mark Sold
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteListing(listing.id)}
                    disabled={loading === listing.id}
                    className="h-7 px-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EditableListingsTab;
