
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

interface Order {
  id: string;
  product: {
    name: string;
    price: number;
    images: string[];
    brand: string;
  };
  seller: {
    name: string;
  };
  total_amount: number;
  status: string;
  created_at: string;
}

interface OrdersTabProps {
  orders: Order[];
}

const OrdersTab = ({ orders }: OrdersTabProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img
                src={order.product?.images?.[0] || '/placeholder.svg'}
                alt={order.product?.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{order.product?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {order.product?.brand}
                </p>
                <p className="text-sm text-muted-foreground">
                  Seller: {order.seller?.name}
                </p>
                <p className="font-bold">${order.total_amount}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrdersTab;
