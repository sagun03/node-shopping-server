export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  category: string;
  isPopular: boolean; 
  sizes: Array<{
    size: string;
    price: number;
    images: string[];
    inStock: boolean;
    isPopular: boolean;
    subTitle?: string;
  }>;
  reviews?: string[];
}

export interface ProductInputDTO {
  name: string;
  description: string;
  categoryId: string;
  category: string;
  isPopular?: boolean;
  sizes: Array<{
    size: string;
    price: number;
    images: string[];
    inStock: boolean;
    isPopular?: boolean;
    subTitle?: string;
  }>;
  reviews?: string[];
}