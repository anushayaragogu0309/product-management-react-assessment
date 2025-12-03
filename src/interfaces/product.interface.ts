export interface Product {
  id: number | null;
  name: string;
  price: number;
  category: string;
  stock?: number;
  description?: string;
  createdAt?: string;
  isActive?: boolean;
}
