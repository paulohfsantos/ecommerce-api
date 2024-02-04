import { ProductCategory } from './product-category-model';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  qty_available: number;
  createdAt: Date;
  updatedAt: Date;
}
