export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  category: string;
  sizes: Array<{
    size: string;
    price: number;
    images: string[];
    inStock: boolean;
  }>;
  reviews?: string[];
}


export interface ProductInputDTO {
  name: string;
  description: string;
  categoryId: string;
  category: string;
  sizes: Array<{
    size: string;
    price: number;
    images: string[];
    inStock: boolean;
  }>;
  reviews?: string[];
}