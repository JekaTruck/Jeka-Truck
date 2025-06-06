export interface Product {
  id: string;
  code: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  specifications: Record<string, string>;
  compatibleVehicles: string[];
  price: number;
  originalPrice?: number;
  stock: number;
  images: string[];
  tags: string[];
  isOEM: boolean;
  warranty: string;
}

export interface SearchFilters {
  brand?: string;
  category?: string;
  priceRange?: [number, number];
  vehicle?: string;
  inStock?: boolean;
}