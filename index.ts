export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor";
  category: "golf" | "tennis" | "padel" | "hockey" | "cycling";
  subcategory: string;
  size?: string;
  brand: string;
  images: string[];
  sellerId: string;
  sellerName?: string;
  sellerRating?: number;
  createdAt: string;
  location?: string;
  status: "active" | "sold" | "withdrawn";
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  joinedDate: string;
  itemsSold: number;
  followers: number;
  following: number;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  profilePicture: string;
  userType: "buyer" | "seller" | "both";
  sportsInterests: string[];
  language?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  quantity: number;
  createdAt: string;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  product?: Product;
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingAddress?: any;
  createdAt: string;
  updatedAt: string;
}

export type Category = "golf" | "tennis" | "padel" | "hockey" | "cycling" | "all";

export type ProductCategory = "golf" | "tennis" | "padel" | "hockey" | "cycling";

export interface SubcategoryOption {
  value: string;
  label: string;
  sizes?: string[];
}

export interface CategoryConfig {
  subcategories: SubcategoryOption[];
}

export interface SizeOption {
  value: string;
  label: string;
}

export interface SellerProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  profilePicture: string;
}
